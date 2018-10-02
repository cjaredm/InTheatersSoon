// @flow
import React from "react";
import styled from "styled-components";
import type {NavigationScreenProp} from 'react-navigation';
import {withAppState} from "../../app-state";
import type {AppState} from "../../app-state";
import {api} from "../../requests/http";
import ResultsList from "./ResultsList";
import MovieTrailer from "./MovieTrailer";
import {ScreenOuter} from "../../styles/layouts";

type Props = {
  appState: AppState,
  navigation: NavigationScreenProp<{}>,
  openSettings: any,
};

type State = {
  error: boolean,
  trailers: any | void
};

class HomeScreen extends React.Component<Props, State> {
  state = {
    error: false,
    trailers: null
  };

  setError = (error: boolean) => this.setState({ error });

  setTrailers = (id: number | string) => {
    if (!id) {
      return this.setState({ trailers: null });
    }

    api
      .getMovieTrailers(id)
      .then(response => {
        // response = {id, results: [{id, key, name}]}
        return this.setState({ trailers: response.results, error: false });
      })
      .catch(() => this.setState({ error: true }));
  };

  unsetTrailers = () => this.setState({ trailers: null });

  render() {
    const { setError, setTrailers } = this;
    const {navigation, appState: {dims}} = this.props;


    return (
      <ScreenOuter fullscreen>
        <ResultsList
          navigation={navigation}
          setError={setError}
          setTrailers={setTrailers}
          error={this.state.error}
          dims={dims}
        />

        <ModalContainer
          animationType="slide"
          transparent={false}
          visible={Boolean(this.state.trailers)}
          supportedOrientations={["landscape-right"]}
        >
          <FlexView>
            <MovieTrailer
              videoKey={
                this.state.trailers &&
                this.state.trailers[this.state.trailers.length - 1].key
              }
              unsetTrailers={this.unsetTrailers}
            />
          </FlexView>
        </ModalContainer>
      </ScreenOuter>
    );
  }
}

export default withAppState({})(HomeScreen);

const ModalContainer = styled.Modal`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const FlexView = styled.View`
  flex: 1;
`;
