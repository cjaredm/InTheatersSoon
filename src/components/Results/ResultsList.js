// @flow
import React from "react";
import styled from "styled-components";
import type { AppStateSubscription, TMDB_CONFIG } from "../../appState";
import { api } from "../../requests/http";
import MovieItem from "./MovieItem";
import { COLORS } from "../../styles/theme";

type Props = {
  appState: AppStateSubscription,
  setError: Function,
  setTrailers: Function,
  dims: Object
};

type State = {
  page: null | number,
  isLoading: boolean,
  upcomingResults: Array<{}>,
  TMDB_configuration: ?TMDB_CONFIG
};

export default class ResultsList extends React.Component<Props, State> {
  state = {
    page: null,
    isLoading: true,
    upcomingResults: [],
    TMDB_configuration: null
  };

  componentDidMount() {
    this.getConfig();
    this.getUpcomingMovies().then(upcomingResults =>
      this.setState({
        upcomingResults
      })
    );
  }

  getConfig = () =>
    api
      .configuration()
      .then(TMDB_config => {
        const { appState } = this.props;
        appState.updateState({ TMDB_config });
      })
      .catch(error => error);

  getUpcomingMovies = () =>
    api
      .upcoming()
      .then(({ results }) => {
        return results.map((item, i) => ({
          ...item,
          index: i
        }));
      })
      .catch(error => error);

  addNextPageOfUpcomingResults = () => {
    this.setState({ isLoading: true });
    api
      .upcoming(this.state.page + 1)
      .then(result => {
        const { results } = result;
        const newUpcomingResults = results.map((item, i) => ({
          ...item,
          index: i
        }));
        this.setState({
          isLoading: false,
          upcomingResults: [
            ...this.state.upcomingResults,
            ...newUpcomingResults
          ]
        });
      })
      .catch(() => {
        this.setState({ isLoading: false, upcomingResults: [] });
        this.props.setError(true);
      });
  };

  render() {
    const { setTrailers, dims, appState } = this.props;

    return (
      <ScrollableList
        data={
          // TODO: Decide if I allow searching or not, this is because I used to allow it
          this.state.upcomingResults || []
        }
        onEndReached={this.addNextPageOfUpcomingResults}
        keyExtractor={(item, index) => `${index}`}
        onEndReachedThreshold={3}
        initialNumToRender={3}
        underlayColor="red"
        renderItem={({ item }) => {
          return (
            <MovieItem
              movie={item}
              appState={appState}
              config={appState.state.TMDB_config || {}}
              getVideoUrl={setTrailers}
              color={item.index % 2 === 0 ? COLORS.primary : COLORS.secondary}
              dims={dims}
            />
          );
        }}
      />
    );
  }
}

const ScrollableList = styled.FlatList`
  width: 100%;
  padding: 0 20px;
  background-color: ${COLORS.background};
`;
