import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './Auth';
import Application from './Application';
import LandingCorporate from './Landing';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
import { getMenu } from '../../redux/actions/uiActions';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends React.Component {
  componentDidMount() {
    const { getMenuFn } = this.props;
    getMenuFn();
  }

  render() {
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {(changeMode) => (
            <Switch>
              <Route path="/" exact component={LandingCorporate} />
              <Route
                path="/app"
                render={(props) => <Application {...props} changeMode={changeMode} />}
              />
              <Route component={Auth} />
            </Switch>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    );
  }
}

App.propTypes = {
  getMenuFn: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getMenuFn: getMenu
};

export default connect(null, mapDispatchToProps)(App);
