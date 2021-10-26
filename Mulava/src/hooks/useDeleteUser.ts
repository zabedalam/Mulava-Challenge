import { useContext, useState } from "react";
import DataContext from "../contexts/DataContext";
import RequestState from "../request-state";

interface IDeleteUserHook {
  deleteUser: (email: string) => void;
  requestState: RequestState;
  errorMessage: string;
}

// Create a hook that generates a function allowing you to delete a user
// (both in the server and in the application data)
const useDeleteUser = (): IDeleteUserHook => {
  const { actions } = useContext(DataContext);
  const [requestState, setRequestState] = useState(RequestState.Idle);
  const [errorMessage, setErrorMessage] = useState("");

  // Create a function allowing to delete an existing user from the server
  // (this function waits for the request to respond before removing the new user
  // to the list of users displayed by the component in order to ensure that the list
  // users is perfectly synchronized with the state of the data on the server)
  const deleteUser = (email: string) => {
    setRequestState(RequestState.Pending);
    fetch(`http://localhost:4000/api/user/${email}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          let errorMessage = "Unable to delete the user.";

          if (response.status === 404) {
            errorMessage = "User not found.";
          }

          throw new Error(errorMessage);
        }

        return response.json();
      })
      .then((json) => {
        setRequestState(RequestState.Success);
        actions?.removeUser(email);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setRequestState(RequestState.Failed);
        console.error(error);
      });
  };

  return {
    deleteUser,
    requestState,
    errorMessage,
  };
};

export default useDeleteUser;
