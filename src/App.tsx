import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Páginas del proyecto: */
import Menu from "./components/mainPage/Menu";
import Page from "./pages/mainPage";
import Login from "./pages/LogIn";
import Ayuda from "./pages/ayuda"
import DatosPersonales from "./pages/datosPersonales";;
import HacerInforme from "./pages/hacerInforme";
import ReportarIncidencia from "./pages/reportarIncidencia"
import PanelAdmin from "./pages/panelAdmin";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/home" exact>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/home" exact>
                  <Page />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/help" exact>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/help" exact>
                  <Ayuda />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/profile/edit" exact>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/profile/edit" exact>
                  <DatosPersonales />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/report/create" exact>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/report/create" exact>
                  <HacerInforme />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/report/issue" exact>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/report/issue" exact>
                  <ReportarIncidencia />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/adminPane" exact>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/adminPane" exact>
                  <PanelAdmin />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;