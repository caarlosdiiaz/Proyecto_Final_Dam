import {
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Profesor } from "../templates/interfaces templates";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

function DatosPersonales() {
  const history = useHistory();
  const [profesor, setProfesor] = useState<Profesor | null>(null);
  const [telefono, setTelefono] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [contrasenaConfirmar, setContrasenaConfirmar] = useState<string>("");

  useEffect(() => {
    const storedProfesor = localStorage.getItem("profesor");
    if (storedProfesor) {
      const parsedProfesor = JSON.parse(storedProfesor);
      setProfesor(parsedProfesor);
      setTelefono(parsedProfesor.telefono);
      setEmail(parsedProfesor.email);
    } else {
      history.push("/");
    }
  }, [history]);

  const actualizar = (e: string, valor: string) => {
    if (e === "telefono") {
      try {
        const telefonoValido = /^[0-9]{9}$/.test(valor);
        if (!telefonoValido) {
          throw new Error("Número de teléfono no válido");
        }
        setTelefono(valor);
      } catch (error) {
        console.log(error);
        alert("Número de teléfono no válido. Debe tener 9 dígitos.");
      }
    }
    if (e === "email") {
      setEmail(valor);
    }
    if (e === "contrasena") {
      setContrasena(valor);
    }
    if (e === "contrasenaConfirmar") {
      setContrasenaConfirmar(valor);
    }
  }

  const actualizarVentana = () => {
    window.location.reload();
  }

  const guardarCambios = () => {
    if (email !== profesor?.email || telefono !== profesor?.telefono) {
      const updatedProfesor = { ...profesor, email, telefono };
      console.log(profesor);
      try {
        fetch(`http://localhost:8080/api/profesores/update-login/${profesor?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            telefono: telefono,
          }),
        })
        .then(() => {
          localStorage.setItem("profesor", JSON.stringify(updatedProfesor));
          alert("Datos actualizados correctamente");
        })
      } catch (error) {
        console.log(error);
        alert("Error al guardar los cambios. Por favor, inténtelo de nuevo.");
      }
    }

    if (contrasena !== "" && contrasenaConfirmar !== "") {
      if (contrasena === contrasenaConfirmar) {
        const updatedProfesor = { ...profesor, contrasena };
        try {
          fetch(`http://localhost:8080/api/profesores/update-password/${profesor?.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contrasena: contrasena
            }),
          })
          .then(() => {
            localStorage.setItem("profesor", JSON.stringify(updatedProfesor));
            alert("Datos actualizados correctamente");
          })
        } catch (error) {
          console.log(error);
          alert("Error al guardar los cambios. Por favor, inténtelo de nuevo.");
        }
      } else {
        alert("Las contraseñas no coinciden");
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>
              Cambiar datos personales de: {profesor?.nombre}{" "}
              {profesor?.apellidos}
            </h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-6 mb-4 d-flex align-items-stretch">
              <div className="p-3 rounded shadow bg-light text-dark w-100">
                <h3>Información Personal</h3>
                <IonGrid>
                  <IonGrid className="mb-3">
                    <IonLabel>Nombre</IonLabel>
                    <IonInput
                      className="form-control ps-3"
                      value={profesor?.nombre}
                      disabled
                    ></IonInput>
                  </IonGrid>
                  <IonGrid className="mb-3">
                    <IonLabel>Apellidos</IonLabel>
                    <IonInput
                      className="form-control ps-3"
                      value={profesor?.apellidos}
                      disabled
                    ></IonInput>
                  </IonGrid>
                </IonGrid>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-4 d-flex align-items-stretch">
              <div className="p-3 rounded shadow bg-light text-dark w-100">
                <h3>Información Personal</h3>
                <IonGrid>
                  <IonGrid className="mb-3">
                    <IonLabel>Email</IonLabel>
                    <IonInput
                      className="form-control ps-3"
                      value={email}
                      onIonInput={(e) => actualizar("email", e.detail.value!)}
                    ></IonInput>
                  </IonGrid>
                  <IonGrid className="mb-3">
                    <IonLabel>Teléfono</IonLabel>
                    <IonInput
                      className="form-control ps-3"
                      value={telefono}
                      onIonInput={(e) => actualizar("telefono", e.detail.value!)}
                    ></IonInput>
                  </IonGrid>
                  <IonGrid className="mb-3">
                    <IonLabel>Nueva contraseña: </IonLabel>
                    <IonInput
                    className="form-control ps-3"
                    type="password"
                    placeholder="Contraseña"
                    onIonInput={(e) => actualizar("contrasena", e.detail.value!)}
                  >
                    <IonInputPasswordToggle slot="end" />
                  </IonInput>
                  </IonGrid>
                  <IonGrid className="mb-3">
                    <IonLabel>Confirmar contraseña: </IonLabel>
                    <IonInput
                      className="form-control ps-3"
                      placeholder="Confirmar contraseña"
                      onIonInput={(e) => actualizar("contrasenaConfirmar", e.detail.value!)}
                    >
                      <IonInputPasswordToggle slot="end" />
                    </IonInput>
                  </IonGrid>
                </IonGrid>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary mt-3 px-4"
              onClick={guardarCambios}
              >
              Guardar cambios
            </button>
            <button
              className="btn btn-danger mt-3 px-4"
              onClick={actualizarVentana}
            >
              Cancelar
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default DatosPersonales;
