import React from "react";
import PropTypes from "prop-types";
import { FlatList, Keyboard, Dimensions } from "react-native";
import { api } from "../requests/http";
import ResultsHeader from "./ResultsHeader";
import MovieItem from "./MovieItem";

// const getCalendarPermission = async () => {
//   const { Calendar, Permissions } = Expo;
//   const { status } = await Permissions.getAsync(Permissions.CALENDAR);
//   return status;
// };

export default class ResultsList extends React.Component {
  static propTypes = {
    openSettings: PropTypes.func,
    dims: PropTypes.object
  };

  state = {
    page: null,
    isLoading: false,
    results: null,
    upcomingResults: null,
    TMDB_configuration: {}
    // calendarAccess: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    api
      .configuration()
      .then(TMDB_configuration => this.setState({ TMDB_configuration }))
      .catch(() => {
        this.props.setError(true);
        this.setState({ upcomingResults: null });
      });

    api
      .upcoming()
      .then(({ results, page }) => {
        const upcomingResults = results.map((item, i) => ({
          ...item,
          index: i
        }));
        this.setState({ isLoading: false, upcomingResults, page });
      })
      .catch(() => {
        this.setState({ isLoading: false, upcomingResults: null });
        this.props.setError(true);
      });

    // getCalendarPermission().then(status => {
    //   const { Calendar, Permissions } = Expo;
    //   if (status === 'granted') {
    //     this.setState({calendarAccess: true});
    //   }
    // });
  }

  addNextPageOfUpcomingResults = () => {
    this.setState({ isLoading: true });
    api
      .upcoming(this.state.page + 1)
      .then(result => {
        const { results, page } = result;
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

  requestMovies = searchValue => {
    this.setState({ isLoading: true });
    api
      .searchMovies(searchValue)
      .then(({ results, total_results }) => {
        if (total_results !== 0) {
          this.props.setError(true);
          return this.setState({ isLoading: false, results: results });
        }
        return this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false, results: null });
        this.props.setError(true);
      });

    Keyboard.dismiss();
  };

  inputOnChange = value => {
    this.setState({ searchValue: value });
  };

  resetInput = () => {
    this.setState({ searchValue: "" });
    this.requestMovies("");
  };

  render() {
    const { requestMovies, inputOnChange, resetInput } = this;
    const { setTrailers, setError, error, openSettings } = this.props;
    const { TMDB_configuration } = this.state;

    return (
      <FlatList
        style={{ width: "100%", paddingHorizontal: 20 }}
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
