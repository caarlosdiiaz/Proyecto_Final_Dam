import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Curso } from "../../templates/interfaces templates";

function CreateAlumno() {
  const [alumno, setAlumno] = useState({
    nombre: "",
    apellidos: "",
    numLista: "",
    cursoId: "",
  });

  const [cursos, setCursos] = useState([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAlumno((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!alumno.nombre || !alumno.apellidos || !alumno.numLista || !alumno.cursoId) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/alumnos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: alumno.nombre,
          apellidos: alumno.apellidos,
          numLista: parseInt(alumno.numLista, 10),
          cursoId: parseInt(alumno.cursoId, 10),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el alumno");
      }

      const data = await response.json();
      console.log("Alumno creado exitosamente:", data);
      alert("Alumno creado exitosamente.");
      setAlumno({
        nombre: "",
        apellidos: "",
        numLista: "",
        cursoId: "",
      });
    } catch (error) {
      console.error("Error al procesar el formulario", error);
      alert("Hubo un error al crear el alumno.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Crear Alumno</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={alumno.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellidos" className="form-label">Apellidos</label>
          <input
            type="text"
            className="form-control"
            id="apellidos"
            value={alumno.apellidos}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numLista" className="form-label">Número de Lista</label>
          <input
            type="number"
            className="form-control"
            id="numLista"
            value={alumno.numLista}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cursoId" className="form-label">Curso</label>
          <IonItem>
            <IonSelect
              label="Curso"
              labelPlacement="stacked"
              value={alumno.cursoId}
              onIonChange={(e) => setAlumno({ ...alumno, cursoId: e.detail.value })}
            >
              {cursos.map((curso: Curso) => (
                <IonSelectOption key={curso.id} value={curso.id}>
                  {curso.nivel} {curso.grupo}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </div>
        <button type="submit" className="btn btn-primary">Crear Alumno</button>
      </form>
    </div>
  );
}

export default CreateAlumno;