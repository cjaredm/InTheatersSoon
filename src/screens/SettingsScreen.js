import React from "react";
import { View } from "react-native";
import styled from "styled-components";
// import type {NavigationScreenProp} from 'react-navigation';
import { AppContainer, subscribeTo } from "../appState";
import { SavedMovieList } from "../components/SavedMovies/SavedMoviesList";
import { ScreenOuter } from "../styles/layouts";
import type { AppState } from "../appState";

type Props = {
  // navigation: NavigationScreenProp<{}>,
  subscriptions: Array<{state: AppState, updateState: Function}>,
};

type State = {
  error: void | Object,
  loading: boolean,
  showModal: boolean
};

class SettingsScreen extends React.Component<Props, State> {
  state = {
    error: null,
    loading: false,
    showModal: false
  };

  modalWidth = this.props.subscriptions[0].state.dims.width - 100;

  render() {
    const [appState] = this.props.subscriptions;
    return (
      <Wrapper>
        <SavedMovieList dims={appState.state.dims} />

        <Modal
          dims={appState.state.dims}
          modalWidth={this.modalWidth}
          visible={this.state.showModal}
          animationType="slide"
          transparent
        >
          <View>
            <ModalText>This is a modal of some kind</ModalText>
            <ModalButton onPress={this.closeModal}>
              <ModalCloseText>CLOSE</ModalCloseText>
            </ModalButton>
          </View>
        </Modal>
      </Wrapper>
    );
  }
}

export default subscribeTo([AppContainer])(SettingsScreen);

const Wrapper = styled(ScreenOuter).attrs({ fullscreen: true })`
  width: 100%;
  padding-top: 30px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.Modal`
  width: this.modalWidth;
  min-height: 150px;
  max-height: 220px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  border-color: black;
  position: absolute;
  top: ${({ dims }) => dims.height / 2 - 110}px;
  left: ${({ dims, modalWidth }) => dims.width / 2 - modalWidth / 2}px;
`;

const ModalButton = styled.TouchableHighlight`
  background-color: gold;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  margin: 20px 0;
`;

const ModalText = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const ModalCloseText = styled.Text`
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
`;
