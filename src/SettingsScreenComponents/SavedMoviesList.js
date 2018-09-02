import React from "react";
import PropTypes from "prop-types";
import { FlatList, View } from "react-native";
import { SavedMovie } from "./SavedMovie";

const savedMovies = [1, 2, 3, 4, 5].map(id => ({
  id,
  title: `${id} Really Long Title To see how this wraps`,
  poster: "https://image.tmdb.org/t/p/w185/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
  backdrop: "https://image.tmdb.org/t/p/w300/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg"
}));

export class SavedMovieList extends React.Component {
  static propTypes = {
    dims: PropTypes.object
  };

  render() {
    return (
      <FlatList
        style={{ width: "100%" }}
        underlayColor="red"
        onEndReached={() => {}}
        onEndReachedThreshold={3}
        data={savedMovies}
        keyExtractor={(item, index) => `${index}`}
        ListHeaderComponent={<View />}
        renderItem={({ item }) => {
          return (
            <SavedMovie
              {...item}
              color={item.id % 2 === 0 ? "red" : "gold"}
              dims={this.props.dims}
            />
          );
        }}
      />
    );
  }
}
