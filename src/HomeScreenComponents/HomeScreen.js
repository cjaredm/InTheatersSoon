import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import styled from "styled-components";
import { api } from "../requests/http";
import ResultsList from "./ResultsList";
import MovieTrailer from "./MovieTrailer";

type Props = {
  openSettings: any,
  dims: any
};

export default class HomeScreen extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      trailers: null
    };
  }

  setError = error => this.setState({ error });

  setTrailers = id => {
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

    return (
      <View style={styles.container}>
        <ResultsList
          openSettings={this.props.openSettings}
          setError={setError}
          setTrailers={setTrailers}
          error={this.state.error}
          dims={this.props.dims}
        />

        <Modal
          style={styles.modal}
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
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  modal: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0
  }
});

const FlexView = styled.View`
  flex: 1;
`;
