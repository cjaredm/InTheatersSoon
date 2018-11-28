import React from "react";
import styled from "styled-components";
import { Text } from "../Text";
import { routes } from "../../navigation";

type Props = {
  navigation: Object,
  isLoggedIn: boolean,
  isHomeScreen: ?boolean
};

export default function ResultsHeader(props: Props) {
  const { navigation, isLoggedIn, isHomeScreen } = props;

  // ! TODO: Change these to icons
  const pageDetails = () => {
    switch (true) {
      case !isHomeScreen:
        return { path: routes.home, text: "Home" };
      case isLoggedIn && isHomeScreen:
        return { path: routes.savedMovies, text: "Settings" };
      case !isLoggedIn && isHomeScreen:
        return { path: routes.login, text: "Login" };
      default:
        return { path: routes.login, text: "Login" };
    }
  };

  return (
    <Wrapper pad={!isHomeScreen}>
      <Title>Reel Time Movies</Title>
      <Button onPress={() => navigation.navigate(pageDetails().path)}>
        <Text sizeType="details">{pageDetails().text}</Text>
      </Button>
    </Wrapper>
  );
}

ResultsHeader.defaultProps = {
  isHomeScreen: false
};

const Wrapper = styled.View`
  position: relative;
  padding-top: 20px;
  ${({pad}) => pad ? 'margin: 0 20px;' : 'margin: 0;'}
`;

const Title = styled(Text).attrs({
  sizeType: "heading",
  textAlign: "center"
})`
  margin-bottom: 10px;
`;

const Button = styled.TouchableHighlight`
  position: absolute;
  top: 0;
  right: 0;
`;
