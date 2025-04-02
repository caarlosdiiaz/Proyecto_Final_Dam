import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/mainPage/Menu';
import Page from './pages/mainPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/LogIn';

setupIonicReact();

const App: React.FC = () => {
    return (
    <IonApp>
      <IonReactRouter>
        {/* Botón de cambio de tema */}
        <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
          
        </div>

        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/home/:name" exact>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/home/:name" exact>
                  <Page />
                </Route>
                <Redirect exact from="/" to="/home/Inbox" />
              </IonRouterOutlet>
            </IonSplitPane>
          </Route>
          <Route path="/folder/:name" exact />
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;