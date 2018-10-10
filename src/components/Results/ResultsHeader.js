import React from "react";
import styled from "styled-components";
import { Text } from "../Text";
import { routes } from "../../navigation";

type Props = { navigation: Object, isLoggedIn: boolean };

export default function ResultsHeader(props: Props) {
  const { navigation, isLoggedIn } = props;
  const routePath = isLoggedIn ? routes.savedMovies : routes.login;

  return (
    <Wrapper>
      <Title>Reel Time Movies</Title>
      <Button onPress={() => navigation.navigate(routePath)}>
        <Text sizeType="details">
          {isLoggedIn ? "Account" : "Login / Sign Up"}
        </Text>
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
  textAlign: "center"
})`
  margin-top: 25px;
  margin-bottom: 10px;
`;

const Button = styled.TouchableHighlight`
  position: absolute;
  top: 25px;
  right: 0;
`;
