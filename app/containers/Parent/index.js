import React from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';

const styles = {
  link: {
    display: 'block',
    textTransform: 'capitalize'
  },
  title: {
    margin: '20px 16px 5px',
    textTransform: 'uppercase',
    fontSize: 12,
  }
};

class Parent extends React.Component {
  render() {
    const title = brand.name;
    const description = brand.desc;
    const { classes, history, menu } = this.props;
    // Get Path Location
    let parts = history.location.pathname.split('/');
    const place = parts[parts.length - 1];
    parts = parts.slice(1, parts.length - 1);
    const menuItems = menu.find(obj => (obj.key === place));
    const getMenus = menuArray => menuArray.map((item, index) => {
      if (item.link) {
        return (
          <Button
            key={index.toString()}
            color="primary"
            component={Link}
            className={classes.link}
            to={item.link}
          >
            {item.name}
          </Button>
        );
      }
      return (
        <Typography className={classes.title} variant="h6">
          { item.name }
        </Typography>
      );
    });

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title={place} desc="">
          {menuItems !== undefined && getMenus(menuItems.child, 'key')}
        </PapperBlock>
      </div>
    );
  }
}

Parent.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired
};

const reducer = 'ui';
const mapStateToProps = state => ({
  menu: state.getIn([reducer, 'menu'])
});

export default connect(mapStateToProps, null)(withStyles(styles)(Parent));
