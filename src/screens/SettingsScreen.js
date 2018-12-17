import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import type { NavigationScreenProp } from "react-navigation";
import { AppContainer, subscribeTo } from "../appState";
import { SavedMovieList } from "../components/SavedMovies/SavedMoviesList";
import { ScreenOuter, Spacer } from "../styles/layouts";
import type { SubscriptionTypes } from "../appState";
import { NavHeader } from "../components/NavHeader";
import { Text } from "../components/Text";
import { routes } from "../navigation";
import firebase from "../firebase";

type Props = {
  navigation: NavigationScreenProp<{}>,
  subscriptions: SubscriptionTypes
};

type State = {
  error: void | Object,
  loading: boolean,
  showModal: boolean
};

class SettingsScreen extends React.Component<Props, State> {
  // TODO: Fix the header on this so it doesn't show.
  state = {
    error: null,
    loading: false,
    showModal: false
  };

  async componentDidMount(): void {
    const [
      {
        state: { user },
        updateState
      }
    ] = this.props.subscriptions;
    await firebase
      .database()
      .ref(`/users/${user.id}/movies`)
      .on("value", snapShot => {
        const movies = Object.values(snapShot.val());
        snapShot.val() && updateState({ user: { ...user, movies } });
      });
  }

  // TODO: Fix this nasty dims thing, everywhere
  modalWidth = this.props.subscriptions[0].state.dims.width - 100;

  signOut = () => {
    const {
      navigation,
      subscriptions: [{ resetState }]
    } = this.props;
    firebase
      .database()
      .ref()
      .off();
    resetState();
    navigation.navigate(routes.home);
  };

  render() {
    const {
      navigation,
      subscriptions: [appState]
    } = this.props;
    return (
      <Wrapper>
        <NavHeader
          isStatic={false}
          nav={navigation}
          left={{
            content: <Text>Home</Text>,
            onPress: () => navigation.navigate(routes.home)
          }}
          right={{
            content: <Text>Sign Out</Text>,
            onPress: this.signOut
          }}
        />
        <Spacer />
        <SavedMovieList
          dims={appState.state.dims}
          user={appState.state.user}
          getImageUrl={appState.getImageUrl}
        />

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
