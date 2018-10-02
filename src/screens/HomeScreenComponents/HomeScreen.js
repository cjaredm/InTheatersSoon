// @flow
import React from "react";
import styled from "styled-components";
import { api } from "../../requests/http";
import ResultsList from "./ResultsList";
import MovieTrailer from "./MovieTrailer";

type Props = {
  openSettings: any,
  dims: any
};

type State = {
  error: boolean,
  trailers: any | void
};

export default class HomeScreen extends React.Component<Props, State> {
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
    const { dims, openSettings } = this.props;

    return (
      <Wrapper>
        <ResultsList
          openSettings={openSettings}
          setError={setError}
          setTrailers={setTrailers}
          error={this.state.error}
          dims={dims}
        />

        <ModalConatiner
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
        </ModalConatiner>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  width: 100%;
  margin-top: 20;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ModalConatiner = styled.Modal`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const FlexView = styled.View`
  flex: 1;
`;
