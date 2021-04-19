import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Outer from '../Templates/Outer';
import {
  /* Login, */ Register,
  LoginFullstack, RegisterFullstack,
  ResetPassword, ResetPasswordFullstack,
  LockScreen, ComingSoon,
  Maintenance, TermsConditions
} from '../pageListAsync';

class Auth extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <Redirect to="/app" />
      );
    }

    return (
      <Outer>
        <Switch>
          <Route path="/login" component={LoginFullstack} />
          <Route path="/register" component={Register} />
          <Route path="/reset-password" component={ResetPassword} />
          {/* <Route path="/login-firebase" component={LoginFullstack} /> */}
          <Route path="/register-firebase" component={RegisterFullstack} />
          <Route path="/reset-firebase" component={ResetPasswordFullstack} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/lock-screen" component={LockScreen} />
          <Route path="/maintenance" component={Maintenance} />
          <Route path="/coming-soon" component={ComingSoon} />
          <Route path="/terms-conditions" component={TermsConditions} />
          <Route component={NotFound} />
        </Switch>
      </Outer>
    );
  }
}


Auth.propTypes = {
  isAuthenticated: PropTypes.bool
};

Auth.defaultProps = {
  isAuthenticated: null
};

const reducer = 'authReducer';
const mapStateToProps = (state) => ({
  isAuthenticated: state.get(reducer).loggedIn,
  ...state
});

export default connect(mapStateToProps)(Auth);
