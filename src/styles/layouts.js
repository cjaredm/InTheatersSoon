// @flow
import {SafeAreaView as _SafeAreaView} from 'react-navigation';
import styled from 'styled-components';
import {COLORS} from '../styles/theme';

export const ScreenOuter = styled.View`
  position: relative;
  display: flex;
  flex: 1;
  background-color: ${COLORS.background};
  padding: ${({fullScreen}) => (fullScreen ? '0' : '10px')};
`;

export const SafeAreaView = styled(_SafeAreaView)`
  position: relative;
  flex: 1;
  background-color: ${COLORS.background};
`;

/**
 * For use along with <ScreenOuter fullScreen />
 */
export const ScreenPadding = styled(ScreenOuter)`
  background-color: transparent;
`;

// Enables "button(s) at bottom"
export const FlexContents = styled.View`
  flex: 1;
`;

export const CenterVertical = styled.View`
  display: flex;
  align-items: center;
`;

export const Spacer = styled.View`
  width: 100%;
  height: ${props => props.height}px;
`;

Spacer.defaultProps = {
  height: 15,
};
