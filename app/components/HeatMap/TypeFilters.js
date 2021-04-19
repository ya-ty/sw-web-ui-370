import React from 'react';
import PropTypes from 'prop-types';
import { filters } from 'enl-api/dummy/heatMap';
import MainFilter from '../FilterPanel/MainFilter';

class TypeFilters extends React.Component {
  render() {
    const { filter, type } = this.props;
    return (
      <MainFilter data={filters} filter={filter} type={type} />
    );
  }
}

TypeFilters.propTypes = {
  filter: PropTypes.func.isRequired,
  type: PropTypes.string
};

TypeFilters.defaultProps = {
  type: ''
};

export default TypeFilters;
