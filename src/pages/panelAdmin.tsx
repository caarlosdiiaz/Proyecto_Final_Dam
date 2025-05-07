import { IonContent, IonHeader, IonPage, IonTitle } from "@ionic/react";
import { Profesor } from "../templates/interfaces templates";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import "../components/adminPane/adminPane.css";
import CreateProfesor from "../components/adminPane/createProfesor";
import CreateCurso from "../components/adminPane/createCurso";
import CreateAlumno from "../components/adminPane/createAlumno";
import DeleteAlumnos from '../components/adminPane/deleteAlumnos';
import DeleteProfesores from "../components/adminPane/deleteProfesores";
import DeleteCurso from "../components/adminPane/deleteCurso";

function PanelAdmin() {
  const history = useHistory();
  const [profesor, setProfesor] = useState<Profesor>();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const tabs = [
    { name: "Crear Alumnos" },
    { name: "Crear Profesores" },
    { name: "Crear Cursos" },
    { name: "Eliminar Alumnos" },
    { name: "Eliminar Profesores" },
    { name: "Eliminar Cursos" },
  ];

  const pageToLoad = (pagina: string) => {
    if (pagina === "Crear Alumnos") {
      setSelectedTab("Crear Alumnos");
    }
    if (pagina === "Crear Profesores") {
      setSelectedTab("Crear Profesores");
    }
    if (pagina === "Crear Cursos") {
      setSelectedTab("Crear Cursos");
    }
    if (pagina === "Eliminar Alumnos") {
      setSelectedTab("Eliminar Alumnos");
    }
    if (pagina === "Eliminar Profesores") {
      setSelectedTab("Eliminar Profesores");
    }
    if (pagina === "Eliminar Cursos") {
      setSelectedTab("Eliminar Cursos");
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
      <IonHeader translucent={false}>
        <IonTitle>
          <h1>
            Bienvenido al panel de amdinistrador, {profesor?.nombre} {profesor?.apellidos}
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
          {selectedTab === "Crear Profesores" && <CreateProfesor />}
          {selectedTab === "Crear Cursos" && <CreateCurso />}
          {selectedTab === "Crear Alumnos" && <CreateAlumno />}
          {selectedTab === "Eliminar Alumnos" && <DeleteAlumnos />}
          {selectedTab === "Eliminar Profesores" && <DeleteProfesores />}
          {selectedTab === "Eliminar Cursos" && <DeleteCurso />}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default PanelAdmin;
