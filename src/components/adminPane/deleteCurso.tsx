import { IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { Curso } from "../../templates/interfaces templates";

function DeleteCurso() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cursos/all");
        if (!response.ok) {
          throw new Error("Error al obtener los cursos");
        }
        const data = await response.json();
        setCursos(data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  const eliminarTodosLosCursos = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar todos los cursos?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/cursos/delete-all",
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar todos los cursos");
        }
        setCursos([]);
        alert("Todos los cursos han sido eliminados correctamente");
      } catch (error) {
        console.error("Error al eliminar todos los cursos:", error);
      }
    }
  };

  const seleccionarCurso = async (curso: Curso) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar el curso ${curso.nivel} ${curso.grupo}?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cursos/delete/${curso.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el curso");
        }
        setCursos((prevCursos) =>
          prevCursos.filter((c) => c.id !== curso.id)
        );
        alert("Curso eliminado correctamente");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Eliminar cursos</h1>
      <div className="mb-3 d-flex align-items-center">
        <IonButton color="danger" onClick={eliminarTodosLosCursos}>
          Eliminar Todos
        </IonButton>
      </div>
      <IonGrid className="table table-striped table-hover">
        <IonRow className="table-header">
          <IonCol>Nivel</IonCol>
          <IonCol>Grupo</IonCol>
          <IonCol>Eliminar</IonCol>
        </IonRow>
        {cursos.map((curso) => (
          <IonRow key={curso.id} className="table-row">
            <IonCol>{curso.nivel}</IonCol>
            <IonCol>{curso.grupo}</IonCol>
            <IonCol>
              <button
                className="btn btn-danger"
                onClick={() => seleccionarCurso(curso)}
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

export default DeleteCurso;