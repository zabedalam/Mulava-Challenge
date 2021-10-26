import React, { FC } from "react";
import { IonButton, IonToast } from "@ionic/react";
import { useDeleteUser } from "../hooks";
import RequestState from "../request-state";

interface DeleteUserButtonProps {
  email: string;
}

const DeleteUserButton: FC<DeleteUserButtonProps> = ({ email }) => {
  const { deleteUser, requestState, errorMessage } = useDeleteUser();

  return (
    <>
      <IonButton slot="end" color="danger" onClick={() => deleteUser(email)}>
        Delete
      </IonButton>

      {requestState === RequestState.Failed && (
        <IonToast isOpen={true} message={errorMessage} duration={3000} />
      )}
    </>
  );
};

export default DeleteUserButton;
