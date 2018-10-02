import React from "react";
import styled from "styled-components";
import { Text } from "../../components/Text";
import { routes } from "../../navigation";

type Props = {navigation: Object};

export default function ResultsHeader(props: Props) {
  const {navigation} = props;

  return (
    <Wrapper>
      <Title>Reel Time Movies</Title>
      <Button onPress={() => navigation.navigate(routes.login)}>
        <Text sizeType="minor">Login / Sign Up / Account</Text>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  position: relative;
  padding-top: 25px;
`;

const Title = styled(Text).attrs({
  sizeType: "heading",
  textAlign: "center",
})`
  margin-top: 25px;
  margin-bottom: 10px;
`;

const Button = styled.TouchableHighlight`
  position: absolute;
  top: 25px;
  right: 0;
`;
