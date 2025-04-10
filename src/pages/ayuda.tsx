import { IonContent, IonPage } from "@ionic/react";

const Ayuda: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="container mt-4">
          <h1>Ayuda</h1>
          <p>
            Esta aplicación está diseñada para ayudar a los profesores a
            gestionar sus clases y alumnos de manera eficiente. Aquí encontrarás
            información sobre cómo utilizar las diferentes funcionalidades de la
            aplicación.
          </p>
          <h2>Funciones Principales</h2>
          <ul>
            <li>
              <strong>Gestión de Clases:</strong> Puedes crear, editar y
              eliminar clases.
            </li>
            <li>
              <strong>Gestión de Alumnos:</strong> Puedes añadir, editar y
              eliminar alumnos.
            </li>
            <li>
              <strong>Reportes:</strong> Genera reportes sobre el rendimiento de
              tus alumnos.
            </li>
          </ul>
          <h2>Soporte Técnico</h2>
          <p>
            Si necesitas ayuda adicional, no dudes en contactar con nuestro
            soporte técnico.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Ayuda;