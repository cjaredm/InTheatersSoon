// @flow
import React from "react";
import { TextInput as _TextInput } from "react-native";
import styled from "styled-components";
import { COLORS } from "../styles/theme";
// import {Icon} from '../components/Icon';

// const iconSize = 36;

export class Input extends React.Component<Props, State> {
  textInput: _TextInput;

  state = {
    focused: false
  };

  /*getInputIcon = (): ?string => {
    const {warning, error, success, icon} = this.props;

    switch (true) {
      case warning:
        return 'warning';
      case error:
        return 'warning';
      case success:
        return 'check';
      case Boolean(icon):
        return icon;
      default:
        return null;
    }
  };*/

  /*onPressIcon = () => {
    this.props.onPressIcon && this.props.onPressIcon();
    this.textInput.focus();
  };*/

  onFocus = () => this.setState({ focused: true });
  onBlur = () => this.setState({ focused: false });

  render() {
    const { warning, error, disabled, innerRef, ...otherProps } = this.props;

    const { focused } = this.state;
    // const inputIcon = this.getInputIcon();

    const inputStateColor = () => {
      if (error) return COLORS.error;
      else if (warning) return COLORS.warning;
      else if (focused) return COLORS.primary;
      return COLORS.white;
    };

    return (
      <Wrapper disabled={disabled}>
        <TextInput
          inputStateColor={inputStateColor()}
          placeholderTextColor={COLORS.normal}
          innerRef={node => {
            // This is how Input uses the ref
            this.textInput = node;
            // Support innerRef from above for consumer usage
            innerRef && innerRef(node);
          }}
          editable={!disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...otherProps}
        />
        {/*inputIcon && (
          <WrappedIcon
            icon={inputIcon}
            fill={inputStateColor()}
            onPress={!disabled ? this.onPressIcon : undefined}
            height={iconSize}
            width={iconSize}
          />
        )*/}
      </Wrapper>
    );
  }
}

type Props = {
  warning?: boolean,
  error?: boolean,
  success?: boolean,
  disabled?: boolean,
  icon?: string,
  onPressIcon?: () => mixed,
  innerRef?: Function
};

type State = {
  focused: boolean
};

const Wrapper = styled.View`
  width: 100%;
  justify-content: center;
  margin-bottom: 5px;
  height: 50px;
  opacity: ${({ disabled }) => (disabled ? "0.35" : 1)};
`;

export const TextInput = styled.TextInput`
  border-color: ${({ inputStateColor }) => inputStateColor};
  border-width: 1px;
  border-radius: 5px;
  color: ${COLORS.white};
  flex: 1px;
  font-size: 14px;
  max-height: 50px;
  padding-left: 10px;
`;

/*const WrappedIcon = styled(Icon)`
  align-self: flex-end;
  position: absolute;
  right: 5px;
`;*/
