import { useContext, useState } from "react";
import DataContext from "../contexts/DataContext";
import { IUser } from "../types";
import RequestState from "../request-state";

interface ICreateUserHook {
  createUser: (user: IUser) => void;
  requestState: RequestState;
  errorMessage: string;
}

const useCreateUser = (): ICreateUserHook => {
  const { actions } = useContext(DataContext);
  const [requestState, setRequestState] = useState(RequestState.Idle);
  const [errorMessage, setErrorMessage] = useState("");

  // Create a function allowing you to create a new user on the server
  // (this function waits for the request to respond before adding the new user
  // to the list of user displayed by the component in order to ensure that the list
  // users is perfectly synchronized with the state of the data on the server)
  const createUser = (user: IUser) => {
    setRequestState(RequestState.Pending);
    fetch(`http://localhost:4000/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((json: IUser) => {
        setRequestState(RequestState.Success);
        actions?.addUser(json);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setRequestState(RequestState.Failed);
        console.error(error);
      });
  };

  return {
    createUser,
    requestState,
    errorMessage,
  };
};

export default useCreateUser;
