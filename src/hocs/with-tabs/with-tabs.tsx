import * as React from "react";
import {Subtract} from "utility-types";

const TAB_DEFAULT = `Overview`;

interface State {
  activeTab: string;
}

interface InjectingProps {
  tabCurrent: string;
  onTabClick: () => void;
}

const withTabs = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithTabs extends React.PureComponent<T, State> {
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

  return WithTabs;
};

export default withTabs;
