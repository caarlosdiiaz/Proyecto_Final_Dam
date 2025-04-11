export async function sendEmail(nombreProfesor: string, contenido: string): Promise<void>{
  fetch("http://localhost:8080/api/email/enviar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profesor: nombreProfesor,
      mensaje: contenido,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al enviar el correo electrónico");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Correo electrónico enviado:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
  })
}