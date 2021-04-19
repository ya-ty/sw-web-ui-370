import React from 'react';
import { /* Switch, Route, */ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'enl-components/Loading';
// import Corporate from '../Templates/Corporate';
// import { HomePage, NotFound } from '../pageListAsync';

class Landing extends React.Component {
  render() {
    const { isAuthenticated, loggingIn } = this.props;

    if (loggingIn) {
      return (
        <Loading />
      );
    }

    if (!isAuthenticated) {
      return (
        <Redirect to="/login" />
      );
    }

    return (
      <Redirect to="/app" />
    );

    // return (
    //   <Corporate>
    //     <Switch>
    //       <Route exact path="/" component={HomePage} />
    //       <Route component={NotFound} />
    //     </Switch>
    //   </Corporate>
    // );
  }
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  loggingIn: PropTypes.bool
};

Landing.defaultProps = {
  isAuthenticated: null,
  loggingIn: true
};

const reducer = 'authReducer';
const mapStateToProps = (state) => ({
  isAuthenticated: state.get(reducer).loggedIn,
  loggingIn: state.get(reducer).loggingIn,
  ...state
});

export default connect(mapStateToProps)(Landing);
