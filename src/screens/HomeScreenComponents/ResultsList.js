// @flow
import React from "react";
import styled from "styled-components";
import { api } from "../../requests/http";
import ResultsHeader from "./ResultsHeader";
import MovieItem from "./MovieItem";
import { COLORS } from "../../styles/theme";

type Props = {
  setError: Function,
  setTrailers: Function,
  openSettings: any,
  dims: { width: number, height: number }
};

type State = {
  page: null | number,
  isLoading: boolean,
  upcomingResults: Array<{}>,
  TMDB_configuration: Object
};

export default class ResultsList extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      page: null,
      isLoading: true,
      upcomingResults: [],
      TMDB_configuration: {}
    };
  }

  componentDidMount() {
    Promise.all([this.getConfig(), this.getUpcomingMovies()]).then(
      ([TMDB_configuration, upcomingResults]) => {
        console.log(upcomingResults);
        return this.setState({
          TMDB_configuration,
          upcomingResults
        });
      }
    );
  }

  getConfig = () =>
    api
      .configuration()
      .then(configurations => configurations)
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
    const { setTrailers, openSettings } = this.props;
    const { TMDB_configuration } = this.state;

    return (
      <ScrollableList
        underlayColor="red"
        initialNumToRender={3}
        onEndReached={this.addNextPageOfUpcomingResults}
        onEndReachedThreshold={3}
        data={this.state.results || this.state.upcomingResults}
        keyExtractor={(item, index) => `${index}`}
        ListHeaderComponent={<ResultsHeader openSettings={openSettings} />}
        renderItem={({ item }) => (
          <MovieItem
            {...item}
            config={TMDB_configuration}
            getVideoUrl={setTrailers}
            color={item.index % 2 === 0 ? COLORS.primary : COLORS.secondary}
            dims={this.props.dims}
          />
        )}
      />
    );
  }
}

const ScrollableList = styled.FlatList`
  width: 100%;
  padding: 0 20px;
  background-color: ${COLORS.background};
`;
