import React from "react";
import { SavedMovie } from "./SavedMovie";
import styled from "styled-components";
import { COLORS } from "../../styles/theme";

const savedMovies = [1, 2, 3, 4, 5].map(id => ({
  id,
  title: `${id} Really Long Title To see how this wraps`,
  poster: "https://image.tmdb.org/t/p/w185/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
  backdrop: "https://image.tmdb.org/t/p/w300/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg"
}));

type Props = {
  dims: any,
  savedMovies?: Array
};

export function SavedMovieList(props: Props) {
  return (
    <ScrollableList
      underlayColor="red"
      onEndReachedThreshold={3}
      data={savedMovies}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item }) => {
        return (
          <SavedMovie
            {...item}
            color={item.id % 2 === 0 ? COLORS.primary : COLORS.secondary}
            dims={props.dims}
          />
        );
      }}
    />
  );
}

const ScrollableList = styled.FlatList`
  width: 100%;
`;
