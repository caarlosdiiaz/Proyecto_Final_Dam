import {
  IonAccordion,
  IonAccordionGroup,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import TableComponent from "../components/mainPage/tableComponent";

import { Profesor } from "../interfaces templates";

const Page: React.FC = () => {
  const location = useLocation<{ profesor: Profesor }>();
  const profesor = location.state?.profesor;

  useEffect(() => {
    if (!profesor) {
      console.error("No se encontró información del profesor.");
    }
  }, [profesor]);

  const [niveles, setNiveles] = useState<string[]>([]);
  const [grupos, setGrupos] = useState<string[]>([]);
  const [selectedNivel, setSelectedNivel] = useState<string | null>(null);
  const [selectedGrupo, setSelectedGrupo] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/cursos/niveles-grupos"
        );
        const data = await response.json();
        setNiveles(data.niveles);
        setGrupos(data.grupos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <h1>
              Bienvenido, {profesor.nombre} {profesor.apellidos}
            </h1>
          </IonTitle>
        </IonToolbar>
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
                    onClick={() => setSelectedGrupo(grupo)} // Set selected grupo
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
            <TableComponent nivel={selectedNivel} grupo={selectedGrupo} />
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Por favor, selecciona un nivel y un grupo para ver los datos.
            </p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
