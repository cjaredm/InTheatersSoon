import React from "react";
import { SavedMovie } from "./SavedMovie";
import styled from "styled-components";
import { COLORS } from "../../styles/theme";
import type { UserType } from "../../appState";

const testMovie = {
  id: 1,
  index: 0,
  title: `$Really Long Title To see how this wraps`,
  poster: "https://image.tmdb.org/t/p/w185/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
  backdrop: "https://image.tmdb.org/t/p/w300/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg"
};

type Props = {
  dims: any,
  user: UserType,
  getImageUrl: Function
};

export function SavedMovieList(props: Props) {
  const movies = props.user.movies ? props.user.movies : [testMovie];
  return (
    // Make this conditional to user ? ScrollableList : NoSavedMoviesMessage
    <ScrollableList
      underlayColor="red"
      onEndReachedThreshold={3}
      data={movies}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item: movie, index }) => (
        <SavedMovie
          movie={movie}
          backdrop={props.getImageUrl({
            type: "backdrop",
            sizeIndex: 1,
            path: movie.backdrop_path
          })}
          color={index % 2 === 0 ? COLORS.primary : COLORS.secondary}
          dims={props.dims}
        />
      )}
    />
  );
}

const ScrollableList = styled.FlatList`
  width: 100%;
`;
