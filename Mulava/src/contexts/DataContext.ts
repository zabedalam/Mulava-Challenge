import { createContext } from "react";
import { IUser } from "../types";
import RequestState from "../request-state";

export interface DataContextValue {
  users: IUser[];
  fetchState: RequestState;
  actions?: {
    addUser: (user: IUser) => void;
    removeUser: (id: string) => void;
  };
}

const defaultValue: DataContextValue = {
  users: [],
  fetchState: 0,
};

const DataContext = createContext(defaultValue);

export default DataContext;
