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
  navigation: Object,
  isLoggedIn: boolean,
  dims: Object,
  error?: boolean
};

type State = {
  page: null | number,
  isLoading: boolean,
  upcomingResults: Array<{}>,
  TMDB_configuration: Object
};

export default class ResultsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: null,
      isLoading: true,
      upcomingResults: [],
      TMDB_configuration: {}
    };
  }

  componentDidMount() {
    Promise.all([this.getConfig(), this.getUpcomingMovies()]).then(
      ([TMDB_configuration, upcomingResults]) =>
        this.setState({
          TMDB_configuration,
          upcomingResults
        })
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
    const { setTrailers, navigation, dims, isLoggedIn } = this.props;
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
          <ResultsHeader
            navigation={navigation}
            isLoggedIn={isLoggedIn}
            isHomeScreen={true}
          />
        }
        renderItem={({ item }) => (
          <MovieItem
            {...item}
            config={TMDB_configuration}
            getVideoUrl={setTrailers}
            color={item.index % 2 === 0 ? COLORS.primary : COLORS.secondary}
            dims={dims}
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
