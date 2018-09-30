import React from "react";
import styled from "styled-components";
import { Text } from "../../components/Text";

type Props = {
  openSettings: Function
};

export default function ResultsHeader(props: Props) {
  const { openSettings } = props;

  return (
    <Wrapper>
      <Title>In Theaters Soon</Title>
      <Button onPress={openSettings}>
        <Text sizeType="minor">Login / Sign Up / Account</Text>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  position: relative;
  padding-top: 25px;
`;

const Title = styled(Text).attrs({ sizeType: "heading", textAlign: "center" })`
  margin-top: 35px;
  margin-bottom: 10px;
`;

const Button = styled.TouchableHighlight`
  position: absolute;
  top: 20px;
  right: 10px;
`;
