import { hot } from 'react-hot-loader';
import React from 'react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import Header from './global/header/Header';
import Footer from './global/footer/Footer';
import routes from '../routes/routes';

const App = () => {
  return (
    <div id="main">
      <Header />
      <main>
        <Switch>
          {routes.map((route) => {
            return (
              <Route
                {...route}
                key={route.key}
                component={route.component}
              />
            );
          })}
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default hot(module)(withRouter(App));
