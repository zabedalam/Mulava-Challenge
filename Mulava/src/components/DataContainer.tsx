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
    const fetchData = async () => {
      setFetchState(RequestState.Pending);
      try {
        const data = await fetch(`${API_BASEURL}/users`);
        const json = await data.json();
        const store = [];
        store.push(json);
        setUsers(store);
        setFetchState(RequestState.Success);
        // console.log("store",store)
      } catch (error) {
        setFetchState(RequestState.Failed);
      }
    };
    fetchData();
  }, []);

  // Create a function allowing to add a new user in the list
  const addUser = (user: IUser) => {
    setUsers([...users, user]);
  };

  // Create a function allowing to remove a user from the list
  const removeUser = (id: string) => {
    setUsers(users.filter((user: any) => user.id !== id));
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
