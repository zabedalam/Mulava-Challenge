import React, { FC, useEffect, useState } from "react";
import DataContext, { DataContextValue } from "../contexts/DataContext";
import { IUser } from "../types";
import RequestState from "../request-state";

// This component is only a data container, it just display its children inside a context
// in order to be able to distribute its data everywhere in the application
const DataContainer: FC = ({ children }) => {
  const API_BASEURL = "http://localhost:4000/api/";
  const [users, setUsers] = useState<IUser[]>([]);
  // console.log("Users1", users);
  const [fetchState, setFetchState] = useState(RequestState.Idle);

  // Trigger an action only when the component is mounted in the DOM
  useEffect(() => {
    // Declare that the data recovery is in progress
    setFetchState(RequestState.Pending);
    // Send a request to the server to retrieve the list of users
    fetch(`${API_BASEURL}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while fetching users.");
        }
        // Otherwise, get the JSON data from the response
        return response.json();
      })

      //   const SomeCall = request.get(res => {

      //     const Store = [];
      //     Store.push(res.data);

      //     Store.forEach(item => { DoSomethingNeat
      //     });
      //     });
      // .then((json: IUser[]) => {
      //   const store=[]
      //   store.push(json)
      .then((response) => {
        console.log("data", response);
        // const data=response.json()

        const store = [];
        store.push(response);
        console.log("store", store);

        // Store the user list retrieved from the server
        setUsers(store);
        // console.log("hi!",setUsers)
        // Declare that the data recovery was successful
        setFetchState(RequestState.Success);
      })
      // In case of error, declare that the data recovery has failed
      .catch((error) => setFetchState(RequestState.Failed));
  }, [API_BASEURL]);

  //new
  // useEffect(()=>{

  //     const fetchData = async () => {
  //         await setFetchState(RequestState.Pending);
  //         try {

  //             const data = await fetch(`http://localhost:4000/api/users`)
  //             const json = await data.json();
  //             const store=[]
  //             store.push(json)
  //             setUsers(store);
  //             setFetchState(RequestState.Success);
  //             console.log("h",store)
  //         } catch (error) {
  //             setFetchState(RequestState.Failed)
  //         }

  //      }
  //    fetchData()

  // //    setFetchState(RequestState.Success);

  // },[API_BASEURL])

  // Create a function allowing to add a new user in the list
  const addUser = (user: IUser) => {
    setUsers([...users, user]);
  };

  // Create a function allowing to remove a user from the list
  const removeUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Compile all the content to pass to the rest of the application through the context
  const contextValue: DataContextValue = {
    users,
    fetchState,
    actions: {
      addUser,
      removeUser,
    },
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export default DataContainer;
