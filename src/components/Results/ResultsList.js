// @flow
import React from "react";
import styled from "styled-components";
import { api } from "../../requests/http";
import MovieItem from "./MovieItem";
import { COLORS } from "../../styles/theme";
import { AppContainer, subscribeTo } from "../../appState";
import type { AppStateSubscription, TMDB_CONFIG } from "../../appState";

type Props = {
  subscriptions: AppStateSubscription,
  setError: Function,
  setTrailers: Function,
  navigation: Object,
  dims: Object,
  error?: boolean
};

type State = {
  page: null | number,
  isLoading: boolean,
  upcomingResults: Array<{}>,
  TMDB_configuration: ?TMDB_CONFIG
};

class ResultsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: null,
      isLoading: true,
      upcomingResults: [],
      TMDB_configuration: null
    };
  }

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
        const [appState] = this.props.subscriptions;
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
    const {
      setTrailers,
      dims,
      subscriptions: [appState]
    } = this.props;
    return (
      <ScrollableList
        data={
          // TODO: Decide if I allow searching or not, this is because I used to allow it
          appState.TMDB_config
            ? this.state.results || this.state.upcomingResults
            : []
        }
        onEndReached={this.addNextPageOfUpcomingResults}
        keyExtractor={(item, index) => `${index}`}
        onEndReachedThreshold={3}
        initialNumToRender={3}
        underlayColor="red"
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            state={appState.TMDB_config ? appState.TMDB_config : {}}
            getVideoUrl={setTrailers}
            color={item.index % 2 === 0 ? COLORS.primary : COLORS.secondary}
            dims={dims}
          />
        )}
      />
    );
  }
}

export default subscribeTo([AppContainer])(ResultsList);

const ScrollableList = styled.FlatList`
  width: 100%;
  padding: 0 20px;
  background-color: ${COLORS.background};
`;
