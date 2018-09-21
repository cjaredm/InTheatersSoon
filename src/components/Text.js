// @flow
import type { ComponentType } from "react";
import styled from "styled-components";
import { COLORS, FONT_SIZES, FONT_SIZE_TYPES } from "../styles/theme";

type Props = {
  colorType?: $Keys<typeof COLORS>,
  sizeType?: $Keys<typeof FONT_TYPE_SIZES>,
  size?: $Keys<typeof FONT_SIZES> | string | number,
  fontWeight?: string | number,
  textAlign?: string
};

export const Text: ComponentType<Props> = styled.Text`
  color: ${({ colorType }) => COLORS[colorType]};
  font-size: ${({ size, sizeType }) => {
    return FONT_SIZES[size] || size || FONT_SIZE_TYPES[sizeType];
  }};
  font-weight: ${({ fontWeight, sizeType }) => {
    if (fontWeight) return fontWeight;
    return sizeType === "title" ? "bold" : "normal";
  }};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`};
`;

// $FlowFixMe
Text.defaultProps = {
  sizeType: "body",
  colorType: "white"
};
