import React, { FC } from "react";
import { IonList } from "@ionic/react";
import { IUser } from "../types";
import User from "./User";

interface UserListProps {
  users: IUser[];
}

const UserList: FC<UserListProps> = ({ users }) => {
  console.log("userlist", users);
  return (
    <IonList>
      {users.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </IonList>
  );
};
export default UserList;
