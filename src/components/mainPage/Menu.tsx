import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import { useLocation, useHistory } from "react-router-dom";
import {
  homeSharp,
  readerSharp,
  buildSharp,
  powerSharp,
  alertSharp,
  moonSharp,
  sunnySharp,
  shieldHalfOutline
} from "ionicons/icons";
import "./Menu.css";
import { useEffect, useState } from "react";
import { Profesor } from '../../templates/interfaces templates';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Inicio",
    url: "/home",
    iosIcon: homeSharp,
    mdIcon: homeSharp,
  },
  {
    title: "Cambiar datos personales",
    url: "/profile/edit",
    iosIcon: buildSharp,
    mdIcon: buildSharp,
  },
  {
    title: "Hacer informe",
    url: "/report/create",
    iosIcon: readerSharp,
    mdIcon: readerSharp,
  },
  {
    title: "Reportar incidencia",
    url: "/report/issue",
    iosIcon: alertSharp,
    mdIcon: alertSharp,
  },
  {
    title: "Panel administrador",
    url: "/adminPane",
    iosIcon: shieldHalfOutline,
    mdIcon: shieldHalfOutline,
  },{
    title: "Cerrar sesión",
    url: "/",
    iosIcon: powerSharp,
    mdIcon: powerSharp,
  }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [profesor, setProfesor] = useState<Profesor>();

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const storedProfesor = localStorage.getItem("profesor");
    if (storedProfesor) {
      setProfesor(JSON.parse(storedProfesor));
    } else {
      history.push("/");
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem("profesor");
    history.push("/");
  };

  const renderMenuItems = () =>
    appPages.map((appPage, index) => {

      if (appPage.title === "Panel administrador" && (!profesor || !profesor.admin)) {
        return null;
      }

      return (
        <IonMenuToggle key={index} autoHide={false}>
          <IonItem
            className={`list-group-item d-flex align-items-center ${
              location.pathname === appPage.url ? "selected" : ""
            }`}
            routerLink={appPage.url}
            routerDirection="none"
            lines="none"
            detail={false}
            onClick={appPage.title === "Cerrar sesión" ? handleLogout : undefined}
          >
            <IonIcon
              aria-hidden="true"
              slot="start"
              ios={appPage.iosIcon}
              md={appPage.mdIcon}
              className="me-2"
            />
            <IonLabel>{appPage.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      );
    }).filter(Boolean);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list" className="list-group">
          <IonListHeader className="list-group-item list-group-item-action active">
            Menú
            <img
              src={isDarkMode ? sunnySharp : moonSharp}
              alt={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
              onClick={toggleTheme}
              style={{
                cursor: "pointer",
                width: "30px",
                height: "30px",
                position: "absolute",
                right: "0px",
              }}
            />
          </IonListHeader>
          {renderMenuItems()}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;