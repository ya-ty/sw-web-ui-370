import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SidebarGroup from './SidebarGroup'

class SidebarContent extends Component {
  renderGroup = (group, isFiltered = false) => {
    const { activeLevel, setLevel, type } = this.props

     if (group.subgroups) {
      const { isFitFilter, isAlreadyFiltered } = this.filterGroups(group.subgroups, isFiltered)

      if (!type || isFitFilter || (isAlreadyFiltered && (group.category === undefined || group.category === type))) {
        return (
          <SidebarGroup activeLevel={activeLevel} group={group}>
            {group.subgroups.map(subgroup => this.renderGroup(subgroup, isAlreadyFiltered))}
          </SidebarGroup>
        )
      }
      return null
    }
    return (
      <SidebarGroup activeLevel={activeLevel} group={group} onClick={setLevel} />
    )
  }

  filterGroups = (groups, isFiltered) => {
    const { type } = this.props
    const res = []
    let isAlreadyFiltered = isFiltered

    groups.forEach(item => {
      if (item.category) {
        if (item.category === type) {
          isAlreadyFiltered = true
          res.push(item)
        }
      } else if (item.subgroups) {
        const isSubgroupsValid = this.filterGroups(item.subgroups, isAlreadyFiltered).isFitFilter
        if (isSubgroupsValid) {
          res.push(item)
        }
      }
    })

    return {
      isFitFilter: !!res.length,
      isAlreadyFiltered
    }
  }

  render() {
    const { data } = this.props;

    return (
      data.map(group => this.renderGroup(group))
    );
  }
}

SidebarContent.propTypes = {
  data: PropTypes.array.isRequired,
  activeLevel: PropTypes.string.isRequired,
  setLevel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default SidebarContent;
