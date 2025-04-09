import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonInputPasswordToggle,
} from "@ionic/react";
import { sunnySharp, moonSharp } from "ionicons/icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    const loginData = {
      email: email.trim(),
      contrasena: password.trim(),
    };
  
    fetch("http://localhost:8080/api/profesores/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Error en la autenticación");
          });
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("profesor", JSON.stringify(data)); // Guardar en localStorage
        history.push("/home");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          error.message || "Error en la autenticación. Por favor, verifica tus credenciales."
        );
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding bg-gradient">
        <IonGrid className="h-100">
          <IonRow className="justify-content-center align-items-center h-100">
            <IonCol sizeMd="5" sizeLg="4" className="d-none d-md-block">
              <img src="/logo.webp" alt="Sample" className="img-fluid" />
            </IonCol>

            <IonCol sizeMd="6" sizeLg="4">
              <div
                className="bg-light text-dark p-4 rounded shadow-sm"
                style={{ height: "410px" }}
              >
                <img
                  src={isDarkMode ? moonSharp : sunnySharp}
                  alt={isDarkMode ? "Light mode icon" : "Dark mode icon"}
                  onClick={toggleTheme}
                  style={{ cursor: "pointer", width: "30px", height: "30px", right: "18px", position: "absolute", top: "18px" }}
                />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                  className="d-flex flex-column justify-content-center h-100 w-100 gap-3"
                >
                  <IonText>
                    <h3 className="text-center">Iniciar Sesión</h3>
                  </IonText>
                  <IonInput
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    required
                    className="form-control ion-padding-start"
                  />
                  <IonInput
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    required
                    className="form-control ion-padding-start"
                  > 
                    <IonInputPasswordToggle slot="end" />
                  </IonInput>
                  <IonButton expand="block" type="submit" className="fw-bold">
                    Iniciar sesion
                  </IonButton>
                </form>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
