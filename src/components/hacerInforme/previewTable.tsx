import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useEffect, useState } from 'react';
import { registrosDataAlumnos } from "../../templates/interfaces templates";
import createPdf from "../../helpers/createPdf";


interface PreviewTableProps {
  fechaInicio: string | null;
  fechaFin: string | null;
}

function PreviewTable({ fechaInicio, fechaFin }: PreviewTableProps) {
  const [Alumnos, setAlumnos] = useState<registrosDataAlumnos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!fechaInicio || !fechaFin) return;

      try {
        const fechaFinDate = new Date(fechaFin);
        const fechaHoy = new Date();
        const diferenciaDias = (fechaFinDate.getTime() - fechaHoy.getTime()) / (1000 * 60 * 60 * 24);

        const endpoint =
          diferenciaDias > 90
            ? "http://localhost:8080/api/registros-historicos/alumnos-registros"
            : "http://localhost:8080/api/registros/alumnos-registros";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [fechaInicio, fechaFin]);

  if (!fechaFin) {
    return (
      <IonText color="danger">
        Por favor, selecciona una fecha final para realizar la consulta.
      </IonText>
    );
  }

  return (
    <div>
      <IonGrid className="table table-striped table-hover">
        <IonRow className="table-header">
        <IonCol>Nombre del alumno</IonCol>
        <IonCol>Clase</IonCol>
      <IonCol>Cantidad de veces</IonCol>
      </IonRow>
      {Alumnos.map((alumno) => (
        <IonRow key={alumno.alumnoId} className="table-row">
          <IonCol>{alumno.nombre}</IonCol>
          <IonCol>{alumno.curso}</IonCol>
            <IonCol>{alumno.cantidad}</IonCol>
          </IonRow>
        ))}
      </IonGrid>
      <IonButton onClick={() => createPdf(Alumnos)}>
        Descargar informe
      </IonButton>
    </div>
  );
}

export default PreviewTable;