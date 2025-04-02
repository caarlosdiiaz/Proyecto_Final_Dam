import { IonButtons, IonContent, IonHeader, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router';
import { Profesor } from '../interfaces templates';

const Page: React.FC = () => {

  const location = useLocation<{ profesor: Profesor }>();
  const profesor = location.state?.profesor;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><h1>Bienvenido, {profesor.nombre} {profesor.apellidos}</h1></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLabel>{profesor.nombre}</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Page;
