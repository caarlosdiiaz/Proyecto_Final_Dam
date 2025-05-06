import React, { useState } from "react";

function CreateProfesor() {
  const [profesor, setProfesor] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    contrasena: "",
    admin: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setProfesor((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const telefono = profesor.telefono;

    if (isNaN(Number(telefono))) {
      alert("El teléfono debe contener solo números.");
      setProfesor((prevState) => ({
        ...prevState,
        telefono: "",
      }));
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/profesores/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profesor),
      });

      if (response.ok) {
        alert("Profesor creado con éxito");
      } else {
        const error = await response.text();
        alert("Error al crear el profesor: " + error);
      }
    } catch (error) {
      console.log("Error al procesar la solicitud: " + error);
      alert("Error al crear al profesor");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Crear Profesor</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={profesor.nombre}
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
            value={profesor.apellidos}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={profesor.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            id="telefono"
            value={profesor.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="contrasena"
            value={profesor.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="admin"
            checked={profesor.admin}
            onChange={handleChange}
          />
          <label htmlFor="admin" className="form-check-label">Administrador</label>
        </div>
        <button type="submit" className="btn btn-primary">Crear Profesor</button>
      </form>
    </div>
  );
}

export default CreateProfesor;