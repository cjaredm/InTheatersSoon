// @flow
// eslint-disable-next-line
import * as React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import type { NavigationScreenProp } from "react-navigation";
import { COLORS } from "../styles/theme";
import { Text } from "./Text";
import { routes } from "../navigation";

export function NavHeader(props: Props) {
  const { title, left, right, nav, isStatic } = props;
  return (
    <Header isStatic={isStatic}>
      {left && (
        <TouchableOpacity onPress={() => left.onPress && left.onPress(nav)}>
          {left.content}
        </TouchableOpacity>
      )}

      {title && <Text colorType="white">{title}</Text>}

      {right.content && (
        <RightButton onPress={() => right.onPress && right.onPress(nav)}>
          {right.content}
        </RightButton>
      )}
    </Header>
  );
}

NavHeader.defaultProps = {
  left: {
    content: <Text colorType="white">Back</Text>,
    onPress: nav =>
      nav.state.routes.length === 1
        ? nav.navigate(routes.home)
        : nav.goBack(null)
  },
  right: {
    content: <Text colorType="white">Cancel</Text>,
    onPress: nav => nav.navigate(routes.home)
  },
  isStatic: true
};

type HeaderButtonProps = {
  content?: React.Node,
  onPress?: Function
};

type Props = {
  nav: NavigationScreenProp<{ routes: Array<string> }>,
  left: HeaderButtonProps,
  right: HeaderButtonProps,
  title?: string,
  isStatic?: boolean
};

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ isStatic }) => (isStatic ? "40px" : "0")} 20px 0 20px;
  background-color: ${COLORS.background};
`;

const RightButton = styled.TouchableOpacity`
  margin-left: ${({ title }) => (title ? 0 : "auto")};
`;
