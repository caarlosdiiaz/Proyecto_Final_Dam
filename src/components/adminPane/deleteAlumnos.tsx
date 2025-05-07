import { IonCol, IonGrid, IonItem, IonRow, IonSelect, IonSelectOption, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { Alumno, Curso } from "../../templates/interfaces templates";

function DeleteAlumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selectedCurso, setSelectedCurso] = useState<string>("");

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

  const fetchAlumnosByCurso = async (cursoId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/alumnos/curso/${cursoId}`);
      if (!response.ok) {
        throw new Error("Error al obtener los alumnos del curso");
      }
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error("Error al cargar los alumnos:", error);
    }
  };

  const eliminarTodosLosAlumnos = async (cursoId: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar a todos los alumnos de este curso?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/alumnos/deleteall/curso/${cursoId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar todos los alumnos del curso");
        }
        setAlumnos([]); // Limpia la lista de alumnos después de eliminarlos
        alert("Todos los alumnos del curso han sido eliminados correctamente");
      } catch (error) {
        console.error("Error al eliminar todos los alumnos:", error);
      }
    }
  };

  const seleccionarAlumno = async (alumno: Alumno) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar a ${alumno.nombre} ${alumno.apellidos}?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/alumnos/delete/${alumno.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el alumno");
        }
        setAlumnos((prevAlumnos) =>
          prevAlumnos.filter((a) => a.id !== alumno.id)
        );
        alert("Alumno eliminado correctamente");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Eliminar alumnos</h1>
      <div className="mb-3 d-flex align-items-center">
        <IonItem className="flex-grow-1 me-3">
          <IonSelect
            placeholder="Selecciona un curso"
            value={selectedCurso}
            onIonChange={(e) => {
              const cursoId = e.detail.value;
              setSelectedCurso(cursoId);
              fetchAlumnosByCurso(cursoId);
            }}
          >
            {cursos.map((curso) => (
              <IonSelectOption key={curso.id} value={curso.id}>
                {curso.nivel} {curso.grupo}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonButton
          color="danger"
          disabled={!selectedCurso}
          onClick={() => eliminarTodosLosAlumnos(selectedCurso)}
        >
          Eliminar Todos
        </IonButton>
      </div>
      <IonGrid className="table table-striped table-hover">
        <IonRow className="table-header">
          <IonCol>Nombre</IonCol>
          <IonCol>Apellidos</IonCol>
          <IonCol>Número de lista</IonCol>
          <IonCol>Repetidor</IonCol>
          <IonCol>Eliminar</IonCol>
        </IonRow>
        {alumnos.map((alumno) => (
          <IonRow key={alumno.id} className="table-row">
            <IonCol>{alumno.nombre}</IonCol>
            <IonCol>{alumno.apellidos}</IonCol>
            <IonCol>{alumno.numLista}</IonCol>
            <IonCol>{alumno.repetidor ? "Sí" : "No"}</IonCol>
            <IonCol>
              <button
                className="btn btn-danger"
                onClick={() => seleccionarAlumno(alumno)}
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

export default DeleteAlumnos;