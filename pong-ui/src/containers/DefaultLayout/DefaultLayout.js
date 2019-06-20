import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HotKeys } from 'react-hotkeys';
import routes from '../../routes';
import { Page404 } from '../../views/Pages';

const keyMap = {
  SHOW_REFRESH_BUTTON: 'up up down down left right left right b a',
};

class DefaultLayout extends Component {
  constructor() {
    super();
    this.state = {
      showRefreshButton: false,
    };
  }

  handlers = {
    SHOW_REFRESH_BUTTON: (e) => this.setState({ showRefreshButton: true })
  }

  render() {
    return (
      <HotKeys className="app" keyMap={keyMap} handlers={this.handlers}>
        <main className="main-content">
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                <route.component {...props} showRefreshButton={this.state.showRefreshButton}  />
                )} />)
                : (null);
            })}
            <Route name="Page 404" component={Page404} />
          </Switch>
        </main>
      </HotKeys>
    );
  }
}

export default DefaultLayout;
