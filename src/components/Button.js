// @flow
import React from "react";
import styled from "styled-components";
import { COLORS, FONT_SIZE_TYPES } from "../styles/theme";

export function Button(props: Props) {
  const { children, ...otherProps } = props;

  return (
    <TouchableOpacity activeOpacity={0.8} {...otherProps}>
      <ButtonText btnStyle={props.btnStyle}>
        {children.toUpperCase()}
      </ButtonText>
    </TouchableOpacity>
  );
}

type Props = {
  onPress: () => mixed,
  children: string,
  btnStyle?: "primary" | "ghost" | "dialog",
  disabled?: boolean
};

Button.defaultProps = {
  btnStyle: "primary"
};

const btnStyleStyles = {
  primary: {
    borderColor: "transparent",
    backgroundColor: COLORS.primary
  },
  ghost: {
    borderColor: COLORS.normal,
    backgroundColor: "transparent"
  },
  dialog: {
    borderColor: "transparent",
    backgroundColor: COLORS.white
  }
};

const ButtonText = styled.Text`
  font-size: ${FONT_SIZE_TYPES.button};
  color: ${({ btnStyle }) =>
    btnStyle === "dialog" ? COLORS.normal : COLORS.white};
  font-weight: bold;
`;

const TouchableOpacity = styled.TouchableOpacity`
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ btnStyle }) => btnStyleStyles[btnStyle].borderColor};
  background-color: ${({ btnStyle }) =>
    btnStyleStyles[btnStyle].backgroundColor};
`;
