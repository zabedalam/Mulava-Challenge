import React, { FC, useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import { useCreateUser } from "../hooks";

const AddUserInfoForm: FC = () => {
  // Generate a function used to create a new user
  const { createUser } = useCreateUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Create a function allowing you to add a new user when you click on the button
  const handleClick = () => {
    createUser({
      name,
      email,
    });
    setName("");
    setEmail("");
  };

  return (
    <>
      <IonItem>
        <IonLabel position="floating">Name</IonLabel>
        <IonInput
          placeholder="Write new user name"
          value={name}
          onIonChange={(event) => setName(event.detail.value as string)}
        />
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          placeholder="Write new user email"
          value={email}
          onIonChange={(event) => setEmail(event.detail.value as string)}
        />
      </IonItem>

      <IonButton expand="block" onClick={handleClick}>
        Add User
      </IonButton>
    </>
  );
};

export default AddUserInfoForm;
