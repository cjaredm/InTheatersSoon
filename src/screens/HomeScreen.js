// @flow
import React from "react";
import styled from "styled-components";
import type { NavigationScreenProp } from "react-navigation";
import type { AppState } from "../appState";
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
  subscriptions: Array<{ state: AppState, updateState: Function }>
};

type State = {
  error: boolean,
  trailers: any | void
};

class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <NavHeader
        nav={navigation}
        left={{}}
        right={{
          content: <Text>Login</Text>,
          onPress: () => navigation.navigate(routes.login)
        }}
      />
    )
  });
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
        navigation,
        subscriptions: [
          {
            state: { dims, user }
          }
        ]
      }
    } = this;

    return (
      <ScreenOuter fullscreen>
        <Title>Reel Time Movies</Title>
        <ResultsList
          navigation={navigation}
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
