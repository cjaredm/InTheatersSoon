import React from "react";
import { WebView } from "react-native";
import styled from "styled-components";

type Props = {
  videoKey: string,
  unsetTrailers: any
};

export default function MovieTrailer(props: Props) {
  return (
    <Wrapper>
      <Button onPress={props.unsetTrailers}>
        <ExitText>&#x2716;</ExitText>
      </Button>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${props.videoKey}` }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  position: relative;
  align-self: stretch;
  height: 100%;
`;

const Button = styled.TouchableHighlight`
  border-radius: 25px;
  background-color: yellow;
  height: 50px;
  width: 50px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 999;
  display: flex;
`;

const ExitText = styled.Text`
  text-align: center;
  line-height: 50px;
  font-size: 42px;
`;
