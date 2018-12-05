import React from "react";
import styled from "styled-components";
import type { MovieType } from "../Results/MovieItem";
import type { DIMS } from "../../appState";

type Props = {
  backdrop: string,
  movie: MovieType,
  color: string,
  dims: DIMS
};

export function SavedMovie(props: Props) {
  const { color: backgroundColor, movie, dims, backdrop } = props;
  const posterWidth = 65;

  return (
    <Wrapper backgroundColor={backgroundColor} width={dims.width}>
      <Poster source={{ uri: backdrop }} alt="Movie Poster" key={movie.id} />
      <TextContainer dimWidth={dims.width} posterWidth={posterWidth}>
        <Title>{movie.title}</Title>
        <Date>{movie.release_date}</Date>
      </TextContainer>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: ${({ width }) => width};
  height: 100px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex: 1;
  flex-direction: row;
`;

const Poster = styled.Image`
  height: 100;
  width: 120;
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const Title = styled.Text`
  text-align: center;
  color: white;
  line-height: 16px;
  font-size: 16px;
  font-weight: bold;
`;

const Date = styled.Text`
  text-align: center;
`;
