import { IonButton } from '@ionic/react';

// Define la interfaz para las props
export interface SubmitButtonProps {
  profesorId: string;
  alumnoId: string;
}

function SubmitButton({ profesorId, alumnoId }: SubmitButtonProps) {
  const handleSubmit = async () => {
    fetch("http://localhost:8080/api/registros/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alumnoId: alumnoId,
        profesorId: profesorId
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Registro creado con éxito");
        } else {
          alert("Error al crear el registro");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registro creado:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al crear el registro");
      });
  };

  return <IonButton onClick={handleSubmit}>Crear registro</IonButton>;
}

export default SubmitButton;