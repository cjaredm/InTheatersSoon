import React from "react";
import {Provider} from 'unstated';
import { RootNavigator } from "./navigation";
// import {Orientation} from './utils/Orientation';
// import styled from "styled-components";
// import { COLORS } from "./styles/theme";

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <RootNavigator />
      </Provider>
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
