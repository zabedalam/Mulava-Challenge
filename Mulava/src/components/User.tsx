import React, { FC } from "react";
import {  IonItem } from "@ionic/react";
import { IUser } from "../types";
import DeleteUserButton from "./DeleteUserButton";

interface UserProps {
  user: IUser;
}
const User: FC<UserProps> = ({ user }) => (
  <IonItem>
    {user.email}
    {user.id && <DeleteUserButton id={user.id} />}
  </IonItem>
);
export default User;
