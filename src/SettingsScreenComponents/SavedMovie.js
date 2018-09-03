import React from "react";
import styled from "styled-components";

type Props = {
  color: string,
  title: any,
  backdrop: string,
  dims: any,
  id: any
};

export function SavedMovie(props: Props) {
  const {
    color: backgroundColor,
    title,
    id,
    /*poster,*/
    backdrop,
    dims
  } = props;

  const posterWidth = 65;

  return (
    <Wrapper backgroundColor={backgroundColor} width={dims.width}>
      <Poster source={{ uri: backdrop }} alt="Movie Poster" key={id} />
      <TextContainer dimWidth={dims.width} posterWidth={posterWidth}>
        <Title>{title}</Title>
        <Date>2018-09-15</Date>
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
  max-width: ${({ dimWidth, posterWidth }) => dimWidth - posterWidth - 200};
  justify-content: flex-end;
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
