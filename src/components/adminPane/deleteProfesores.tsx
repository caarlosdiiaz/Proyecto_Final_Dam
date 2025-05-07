import { IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { Profesor } from "../../templates/interfaces templates";

function DeleteProfesores() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/profesores/all");
        if (!response.ok) {
          throw new Error("Error al obtener los profesores");
        }
        const data = await response.json();
        setProfesores(data);
      } catch (error) {
        console.error("Error al cargar los profesores:", error);
      }
    };

    fetchProfesores();
  }, []);

  const eliminarTodosLosProfesores = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar a todos los profesores?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/profesores/delete-all",
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar todos los profesores");
        }
        setProfesores([]);
        alert("Todos los profesores han sido eliminados correctamente");
      } catch (error) {
        console.error("Error al eliminar todos los profesores:", error);
      }
    }
  };

  const seleccionarProfesor = async (profesor: Profesor) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar a ${profesor.nombre} ${profesor.apellidos}?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/profesores/delete/${profesor.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el profesor");
        }
        setProfesores((prevProfesores) =>
          prevProfesores.filter((p) => p.id !== profesor.id)
        );
        alert("Profesor eliminado correctamente");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Eliminar profesores</h1>
      <div className="mb-3 d-flex align-items-center">
        <IonButton color="danger" onClick={eliminarTodosLosProfesores}>
          Eliminar Todos
        </IonButton>
      </div>
      <IonGrid className="table table-striped table-hover">
        <IonRow className="table-header">
          <IonCol>Nombre</IonCol>
          <IonCol>Apellidos</IonCol>
          <IonCol>Eliminar</IonCol>
        </IonRow>
        {profesores.map((profesor) => (
          <IonRow key={profesor.id} className="table-row">
            <IonCol>{profesor.nombre}</IonCol>
            <IonCol>{profesor.apellidos}</IonCol>
            <IonCol>
              <button
                className="btn btn-danger"
                onClick={() => seleccionarProfesor(profesor)}
              >
                Eliminar
              </button>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </div>
  );
}

export default DeleteProfesores;