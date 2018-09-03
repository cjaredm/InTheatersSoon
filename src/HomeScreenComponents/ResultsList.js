import React from "react";
import styled from "styled-components";
import { api } from "../requests/http";
import ResultsHeader from "./ResultsHeader";
import MovieItem from "./MovieItem";

type Props = {
  setError: any,
  setTrailers: any,
  dims: any
};

export default class ResultsList extends React.Component<Props> {
  constructor() {
    super(props);

    let TMDB_configuration = {};
    let upcomingResults = [];

    api
      .configuration()
      .then(configurations => (TMDB_configuration = configurations))
      .catch(() => this.props.setError(true));

    api
      .upcoming()
      .then(
        ({ results }) =>
          (upcomingResults = results.map((item, i) => ({
            ...item,
            index: i
          })))
      )
      .catch(() => this.props.setError(true));

    this.state = {
      page: null,
      isLoading: false,
      upcomingResults,
      TMDB_configuration
    };
  }

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
        this.setState({ isLoading: false, upcomingResults: null });
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
        ListHeaderComponent={
          <ResultsHeader {...this.state} openSettings={openSettings} />
        }
        renderItem={({ item }) => (
          <MovieItem
            {...item}
            config={TMDB_configuration}
            getVideoUrl={setTrailers}
            color={item.index % 2 === 0 ? "red" : "gold"}
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
`;
