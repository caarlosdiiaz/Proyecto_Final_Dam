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

import { useLocation } from "react-router-dom";
import {
  readerSharp,
  buildSharp,
  helpSharp,
  powerSharp,
  alertSharp,
  moonSharp,
  sunnySharp,
} from "ionicons/icons";
import "./Menu.css";
import { useEffect, useState } from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Ayuda",
    url: "/help",
    iosIcon: helpSharp,
    mdIcon: helpSharp,
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
    title: "Cerrar sesión",
    url: "/logout",
    iosIcon: powerSharp,
    mdIcon: powerSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Apply the theme class to the body
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderMenuItems = () =>
    appPages.map((appPage, index) => (
      <IonMenuToggle key={index} autoHide={false}>
        <IonItem
          className={`list-group-item d-flex align-items-center ${
            location.pathname === appPage.url ? "selected" : ""
          }`}
          routerLink={appPage.url}
          routerDirection="none"
          lines="none"
          detail={false}
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
    ));

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list" className="list-group">
          <IonListHeader className="list-group-item list-group-item-action active">
            Menú
            <img
            src={isDarkMode ? moonSharp : sunnySharp}
            alt={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
            aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
            onClick={toggleTheme}
            style={{ cursor: "pointer", width: "30px", height: "30px", position:"absolute", right: "0px", }}
          />
          </IonListHeader>
          {renderMenuItems()}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;