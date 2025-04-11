import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Profesor } from "../templates/interfaces templates";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";



function DatosPersonales() {
  const history = useHistory();
  const [profesor, setProfesor] = useState<Profesor | null>(null);

  useEffect(() => {
    const storedProfesor = localStorage.getItem("profesor");
    if (storedProfesor) {
      setProfesor(JSON.parse(storedProfesor));
    } else {
      history.push("/");
    }
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>bienvenido {profesor?.nombre}</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container mt-5">
          <h2>Rellene aquí el formulario para reportar una incidencia:</h2>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default DatosPersonales