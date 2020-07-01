import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const TAB_DEFAULT = `Overview`;

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TAB_DEFAULT,
      };

      this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(tab) {
      this.setState({
        activeTab: tab,
      });
    }

    render() {
      return (<Component
        {...this.props}
        tabCurrent={this.state.activeTab}
        onTabClick={this.handleTabClick}
      />);
    }
  }

  WithTabs.propTypes = {
    tabCurrent: PropTypes.any,
    onTabClick: PropTypes.any,
  };

  return WithTabs;
};

export default withTabs;
