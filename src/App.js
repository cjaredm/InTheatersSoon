import React from "react";
import { Dimensions } from "react-native";
import { RootNavigator } from "./navigation";
import {AppStateProvider} from './app-state';
// import styled from "styled-components";
// import { COLORS } from "./styles/theme";

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
      <AppStateProvider>
        <RootNavigator />
      </AppStateProvider>
    );
  }
}

/*
const Wrapper = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;


* <Wrapper>
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
      */
