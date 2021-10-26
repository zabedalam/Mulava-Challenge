import React, { FC } from "react";
import {  IonItem } from "@ionic/react";
import { IUser } from "../types";
import DeleteUserButton from "./DeleteUserButton";

interface UserProps {
  user: IUser;
}
const User: FC<UserProps> = ({ user }) => {
console.log('user',user)
  return (

    <IonItem>
     {user.name} | {user.email} 
      {user.email && <DeleteUserButton email={user.email} />}
    </IonItem>
  );
}
export default User;
