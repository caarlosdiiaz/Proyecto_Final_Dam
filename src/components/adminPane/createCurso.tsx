import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Profesor } from "../../templates/interfaces templates";

function CreateCurso() {
  const [curso, setCurso] = useState({
    nivel: "",
    grupo: "",
    tutorId: "",
  });

  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/profesores/all"
        );
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCurso((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Nuevo Curso: ", curso);

    if (!curso.nivel || !curso.grupo || !curso.tutorId) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/cursos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(curso),
      });

      if (!response.ok) {
        throw new Error("Error al crear el curso");
      }

      const data = await response.json();
      console.log("Curso creado exitosamente:", data);
      alert("Curso creado exitosamente.");
    } catch (error) {
      console.error("Error al procesar el formulario", error);
      alert("Hubo un error al crear el curso.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Crear Curso</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nivel" className="form-label">
            Nivel
          </label>
          <input
            type="text"
            className="form-control"
            id="nivel"
            value={curso.nivel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="grupo" className="form-label">
            Grupo
          </label>
          <input
            type="text"
            className="form-control"
            id="grupo"
            value={curso.grupo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="grupo" className="form-label">
            Tutor del curso
          </label>
          <IonItem>
            <IonSelect
              label="Tutor del curso"
              labelPlacement="stacked"
              onIonChange={(e) =>
                setCurso({ ...curso, tutorId: e.detail.value })
              }
            >
              {profesores.map((profesor: Profesor) => (
                <IonSelectOption key={profesor.id} value={profesor.id}>
                  {profesor.nombre} {profesor.apellidos}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Crear Curso
        </button>
      </form>
    </div>
  );
}

export default CreateCurso;
