import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

type Props = {
  results: Array,
  openSettings: any
};

export default function ResultsHeader(props: Props) {
  const { results, openSettings } = props;

  return (
    <Wrapper>
      <Title>{results ? "Search Results" : "In Theaters Soon"}</Title>
      <Button onPress={openSettings}>
        <Text>Login / Sign Up / Account</Text>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  position: relative;
  padding-top: 25px;
`;

const Title = styled.Text`
  font-size: 30;
  line-height: 30;
  height: 30;
  margin-top: 20;
  margin-bottom: 10;
  text-align: center;
  text-decoration-line: underline;
`;

const Button = styled.TouchableHighlight`
  position: absolute;
  top: 20px;
  right: 10px;
`;
