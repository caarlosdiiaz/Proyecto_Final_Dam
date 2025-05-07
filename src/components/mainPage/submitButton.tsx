import { IonButton } from '@ionic/react';

export interface SubmitButtonProps {
  profesorId: string;
  alumnoId: string;
}

function SubmitButton({ profesorId, alumnoId }: SubmitButtonProps) {
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/registros/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alumnoId: alumnoId,
          profesorId: profesorId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      alert(data.message || "Registro creado con éxito");
      console.log("Registro creado:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el registro: " + error);
    }
  };

  return <IonButton onClick={handleSubmit}>Crear registro</IonButton>;
}

export default SubmitButton;