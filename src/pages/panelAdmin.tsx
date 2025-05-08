import { IonContent, IonHeader, IonPage, IonTitle } from "@ionic/react";
import { Profesor } from "../templates/interfaces templates";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import "../components/adminPane/adminPane.css";
import CreateProfesor from "../components/adminPane/createProfesor";
import CreateCurso from "../components/adminPane/createCurso";
import CreateAlumno from "../components/adminPane/createAlumno";
import DeleteAlumnos from "../components/adminPane/deleteAlumnos";
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
    setSelectedTab(pagina);
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
          <h1 className="text-center">
            Bienvenido al panel de administrador, {profesor?.nombre} {profesor?.apellidos}
          </h1>
        </IonTitle>
      </IonHeader>

      <IonContent>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <ul className="list-group list-group-horizontal-md flex-wrap">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className={`list-item p-2 m-1 text-center ${
                    selectedTab === tab.name ? "active-tab" : ""
                  }`}
                  onClick={() => pageToLoad(tab.name)}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    minWidth: "150px",
                  }}
                >
                  {tab.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            {selectedTab === "Crear Profesores" && <CreateProfesor />}
            {selectedTab === "Crear Cursos" && <CreateCurso />}
            {selectedTab === "Crear Alumnos" && <CreateAlumno />}
            {selectedTab === "Eliminar Alumnos" && <DeleteAlumnos />}
            {selectedTab === "Eliminar Profesores" && <DeleteProfesores />}
            {selectedTab === "Eliminar Cursos" && <DeleteCurso />}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default PanelAdmin;