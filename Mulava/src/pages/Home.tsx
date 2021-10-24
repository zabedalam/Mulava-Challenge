import React, { useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import AddUserInfo from "../components/AddUserInfo";
import UserList from "../components/UserList";
import DataContext from "../contexts/DataContext";
import RequestState from "../request-state";
import "./Home.css";

const Home: React.FC = () => {
  const { users, fetchState } = useContext(DataContext);
  // console.log("users2",users)

  // Create a function allowing to determine the display according to the current state of data recovery
  const displayContent = () => {
    switch (fetchState) {
      // If the data is being recovered, display a loading indicator
      case RequestState.Pending:
        return <IonSpinner />;

      // If the data has been successfully recovered, display the list of users
      case RequestState.Success:
        return <UserList users={users} />;

      // If the data recovery failed, display an alert
      case RequestState.Failed:
        return (
          <IonToast
            isOpen={true}
            message="Unable to retrieve users."
            duration={3000}
          />
        );

      // In all other cases, display nothing
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {displayContent()}
        <AddUserInfo />
      </IonContent>
    </IonPage>
  );
};

export default Home;
