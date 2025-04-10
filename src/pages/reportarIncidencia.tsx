import {
  IonContent,
  IonHeader,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { sendEmail } from "../helpers/sendEmail";
import { Profesor } from "../templates/interfaces templates";


function ReportarIncidencia() {
  const [contenido, setContenido] = useState<string>("");
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

  const handleContenido = (content: string) => {
    console.log(content);
    setContenido(content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profesor) {
      // await sendEmail(`${profesor.nombre} ${profesor.apellidos}`, contenido);
    } else {
      alert("No se encontró información del profesor.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>Reportar Incidencia</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container mt-5">
          <h2>Rellene aquí el formulario para reportar una incidencia:</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <IonTextarea
                className="form-control"
                id="contenido"
                rows={5}
                value={contenido}
                onIonChange={(e) => handleContenido(e.detail.value!)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ReportarIncidencia;