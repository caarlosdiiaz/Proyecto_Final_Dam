import { IonHeader, IonPage, IonTitle } from "@ionic/react"
import { Profesor } from '../templates/interfaces templates';
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

function PanelAdmin() {
  const history = useHistory();
  const [profesor, setProfesor] = useState<Profesor>();

  useEffect(() => {
    const storedProfesor = localStorage.getItem("profesor");
    if (storedProfesor) {
      const parsedProfesor = JSON.parse(storedProfesor);
      setProfesor(parsedProfesor);

      if (!parsedProfesor.admin) {
        history.push("/home");
      }
    } else {
      history.push("/");
    }
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>
          <h1>
            Bienvenido al panel de amdinistrador, {profesor?.nombre} {profesor?.apellidos}
          </h1>
        </IonTitle>
      </IonHeader>
    </IonPage>
  )
}

export default PanelAdmin