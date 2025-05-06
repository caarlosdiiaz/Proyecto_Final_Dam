import { IonContent, IonHeader, IonPage, IonTitle } from "@ionic/react";
import { Profesor } from "../templates/interfaces templates";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import "../components/adminPane/adminPane.css";
import CreateProfesor from "../components/adminPane/createProfesor";
import CreateCurso from "../components/adminPane/createCurso";
import CreateAlumno from "../components/adminPane/createAlumno";

function PanelAdmin() {
  const history = useHistory();
  const [profesor, setProfesor] = useState<Profesor>();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const tabs = [
    { name: "Alumnos" },
    { name: "Profesores" },
    { name: "Cursos" },
  ];
  const pageToLoad = (pagina: string) => {
    if (pagina === "Alumnos") {
      setSelectedTab("Alumnos");
    }
    if (pagina === "Profesores") {
      setSelectedTab("Profesores");
    }
    if (pagina === "Cursos") {
      setSelectedTab("Cursos");
    }
    if (pagina === "") {
      setSelectedTab("");
    }
  };

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
            Bienvenido al panel de amdinistrador, {profesor?.nombre}{" "}
            {profesor?.apellidos}
          </h1>
        </IonTitle>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container mt-5 ms-3">
          <ul className="list-group-horizontal">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className="list-item"
                onClick={() => pageToLoad(tab.name)}
              >
                {tab.name}
              </li>
            ))}
          </ul>
          {selectedTab === "Profesores" && <CreateProfesor />}
          {selectedTab === "Cursos" && <CreateCurso />}
          {selectedTab === "Alumnos" && <CreateAlumno />}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default PanelAdmin;
