import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alumno } from "../templates/interfaces templates";
import TableComponent from "../components/mainPage/tableComponent";

import { Profesor } from "../templates/interfaces templates";
import SubmitButton from '../components/mainPage/submitButton';

const Page: React.FC = () => {
  const [niveles, setNiveles] = useState<string[]>([]);
  const [grupos, setGrupos] = useState<string[]>([]);
  const [selectedNivel, setSelectedNivel] = useState<string | null>(null);
  const [selectedGrupo, setSelectedGrupo] = useState<string | null>(null);
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const history = useHistory();
  const [profesor, setProfesor] = useState<Profesor>();

  const handleAlumnoSelect = (alumno: Alumno) => {
    setSelectedAlumno(alumno);
    console.log("Alumno seleccionado:", alumno);
  };

  useEffect(() => {
    const storedProfesor = localStorage.getItem("profesor");
    if (storedProfesor) {
      setProfesor(JSON.parse(storedProfesor));
    } else {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cursos/levels-groups");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data: { niveles: string[]; grupos: string[] } = await response.json();

        setNiveles(data.niveles);
        setGrupos(data.grupos);
        console.log("niveles: " + data.niveles);
        console.log("grupos: " + data.grupos);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNiveles([]);
        setGrupos([]);
      }
    };

    fetchData();
  }, []);

  if (!profesor) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonTitle>
          <h1>
            Bienvenido, {profesor.nombre} {profesor.apellidos}
          </h1>
        </IonTitle>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container mt-4">
          <IonAccordionGroup>
            <IonAccordion
              value="niveles"
              className="mb-3 border rounded shadow-sm"
            >
              <IonItem slot="header" className="bg-primary text-white">
                <IonLabel className="fw-bold">Niveles</IonLabel>
              </IonItem>
              <div slot="content" className="p-3">
                {niveles.map((nivel, index) => (
                  <p
                    key={index}
                    onClick={() => setSelectedNivel(nivel)}
                    className={`mb-2 p-2 rounded ${
                      selectedNivel === nivel
                        ? "bg-info text-white"
                        : "bg-light text-dark"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {nivel}
                  </p>
                ))}
              </div>
            </IonAccordion>

            <IonAccordion
              value="grupos"
              className="mb-3 border rounded shadow-sm"
            >
              <IonItem slot="header" className="bg-success text-white">
                <IonLabel className="fw-bold">Grupos</IonLabel>
              </IonItem>
              <div slot="content" className="p-3">
                {grupos.map((grupo, index) => (
                  <p
                    key={index}
                    onClick={() => setSelectedGrupo(grupo)}
                    className={`mb-2 p-2 rounded ${
                      selectedGrupo === grupo
                        ? "bg-info text-white"
                        : "bg-light text-dark"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {grupo}
                  </p>
                ))}
              </div>
            </IonAccordion>
          </IonAccordionGroup>
          {selectedNivel && selectedGrupo ? (
            <TableComponent
              nivel={selectedNivel}
              grupo={selectedGrupo}
              onAlumnoSelect={handleAlumnoSelect}
            />
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Selecciona un nivel y un grupo para ver los datos.
            </p>
          )}
          {selectedAlumno && (
            <div className="mt-5">
              <h2>
                <b>Alumno seleccionado:</b>
              </h2>
              <p>
                {selectedAlumno.nombre} {selectedAlumno.apellidos}
              </p>
              <SubmitButton profesorId={profesor.id} alumnoId={selectedAlumno.id} />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;