import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useState, useEffect } from "react";
import { Alumno } from "../../templates/interfaces templates";
import './tableComponent.css'

function TableComponent({
  nivel,
  grupo,
  onAlumnoSelect,
}: {
  nivel: string;
  grupo: string;
  onAlumnoSelect: (alumno: Alumno) => void;
}) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const seleccionarAlumno = (alumno: Alumno) => {
    onAlumnoSelect(alumno);
  };

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/alumnos/curso?nivel=${nivel}&grupo=${grupo}`
        );
        if (!response.ok) {
          throw new Error("Error en la autenticación");
        }
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAlumnos();
  }, [nivel, grupo]);

  return (
    <IonGrid className="table table-striped table-hover">
      <IonRow className="table-header">
        <IonCol>Nombre</IonCol>
        <IonCol>Apellidos</IonCol>
        <IonCol>Curso</IonCol>
        <IonCol>Repetidor</IonCol>
      </IonRow>
      {alumnos.map((alumno) => (
        <IonRow
          key={alumno.id}
          className="table-row"
          onClick={() => seleccionarAlumno(alumno)}
        >
          <IonCol>{alumno.nombre}</IonCol>
          <IonCol>{alumno.apellidos}</IonCol>
          <IonCol>
            {nivel} {grupo}
          </IonCol>
          <IonCol>{alumno.repetidor ? "Sí" : "No"}</IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
}

export default TableComponent;
