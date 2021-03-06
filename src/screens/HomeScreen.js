// @flow
import React from "react";
import styled from "styled-components";
import type { NavigationScreenProp } from "react-navigation";
import type { SubscriptionTypes } from "../appState";
import { AppContainer, subscribeTo } from "../appState";
import { api } from "../requests/http";
import ResultsList from "../components/Results/ResultsList";
import MovieTrailer from "../components/Results/MovieTrailer";
import { ScreenOuter } from "../styles/layouts";
import { NavHeader } from "../components/NavHeader";
import { Text } from "../components/Text";
import { routes } from "../navigation";

type Props = {
  navigation: NavigationScreenProp<{}>,
  subscriptions: SubscriptionTypes
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
    const {
      setError,
      setTrailers,
      props: {
        navigation: nav,
        subscriptions: [appState]
      }
    } = this;
    const {
      state: { dims, user }
    } = appState;

    const content = <Text>{user ? "Saved" : "Login"}</Text>;
    const destination = user ? routes.savedMovies : routes.login;

    return (
      <ScreenOuter>
        <NavHeader
          isStatic={false}
          nav={nav}
          left={{}}
          right={{
            content,
            onPress: () => nav.navigate(destination)
          }}
        />
        <Title>Reel Time Movies</Title>
        <ResultsList
          appState={appState}
          navigation={nav}
          setError={setError}
          setTrailers={setTrailers}
          error={this.state.error}
          isLoggedIn={Boolean(user)}
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

export default subscribeTo([AppContainer])(HomeScreen);

const Title = styled(Text).attrs({
  sizeType: "heading",
  textAlign: "center"
})`
  margin-bottom: 10px;
`;

const ModalContainer = styled.Modal`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const FlexView = styled.View`
  flex: 1;
`;
