import React from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import HomeScreen from "./src/HomeScreenComponents/HomeScreen";
import SettingsScreen from "./src/SettingsScreenComponents/SettingsScreen";

export const SCREENS = {
  RESULTS_LIST: "RESULTS_LIST",
  SETTINGS: "SETTINGS"
};

export default class App extends React.Component {
  constructor() {
    super();
    const dims = Dimensions.get("window");

    this.state = {
      loading: true,
      activeScreen: SCREENS.RESULTS_LIST,
      isLoadingComplete: false,
      user: null,
      dims
    };
  }

  navigateToSettings = () => this.setState({ activeScreen: SCREENS.SETTINGS });
  navigateToHome = () => this.setState({ activeScreen: SCREENS.RESULTS_LIST });
  setUser = user => this.setState({ user });

  render() {
    return (
      <Wrapper>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}

        {this.state.activeScreen === SCREENS.RESULTS_LIST && (
          <HomeScreen
            openSettings={this.navigateToSettings}
            dims={this.state.dims}
          />
        )}

        {this.state.activeScreen === SCREENS.SETTINGS && (
          <SettingsScreen
            user={this.state.user}
            openHome={this.navigateToHome}
            setUser={this.setUser}
            dims={this.state.dims}
          />
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;
