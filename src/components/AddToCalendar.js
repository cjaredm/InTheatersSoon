// @flow
import React from "react";
import { View, Text, Modal } from "react-native";
import styled from "styled-components";
import type { AppStateSubscription } from "../appState";
import firebase from "../firebase";
import type { MovieType } from "./Results/MovieItem";
import { ConfirmModal } from "./modals";
import { AppContainer, subscribeTo } from "../appState";

type Props = {
  subscriptions: AppStateSubscription,
  movie: MovieType,
  color: string,
  dims: any
};

type State = {
  showModal: boolean,
  error: any
};

class AddToCalendar extends React.Component<Props, State> {
  state = {
    showModal: false,
    error: null
  };

  saveMovie = (movie: Object) => {
    const [
      {
        state: { user }
      }
    ] = this.props.subscriptions;

    if (!user) {
      this.setState({ error: "Sorry, you are not logged in!" });
    } else {
      firebase
        .database()
        .ref(`/users/${user.id}/movies/${movie.id}`)
        .set(movie)
        .then(error => error && console.error(error));
    }
  };

  modalWidth = this.props.dims.width - 100;

  successModalText = (
    <View>
      <ModalText>Successfully Added:</ModalText>
      <Text>Title: {this.props.movie.title}</Text>
      <Text>Date: {this.props.movie.releaseDate}</Text>
      <Text>Alert: 9 AM</Text>
    </View>
  );

  failureModalText = (
    <View>
      <ModalText>Sorry, something went wrong.</ModalText>
    </View>
  );

  render() {
    const { color, dims, movie } = this.props;
    const {
      state: { showModal, error },
      successModalText,
      failureModalText,
      modalWidth
    } = this;

    return (
      <TabBottom color={color}>
        <Date>{movie.releaseDate}</Date>
        <AddButton onPress={() => this.saveMovie(movie)}>
          <ButtonText>Add To Calendar</ButtonText>
        </AddButton>
        <ConfirmModal
          visible={this.state.showModal}
          dims={dims}
          animationType="slide"
          title="Hooray!"
          text="This is the modal text."
          buttonText="CLOSE"
          closeModal={() => this.setState({ showModal: false })}
          transparent
        />

        <Modal animationType="slide" transparent visible={showModal}>
          <ModalContainer modalWidth={modalWidth} dims={dims}>
            {error ? failureModalText : successModalText}
            <ModalButton onPress={() => null}>
              <ModalCloseText>CLOSE</ModalCloseText>
            </ModalButton>
          </ModalContainer>
        </Modal>
      </TabBottom>
    );
  }
}

export default subscribeTo([AppContainer])(AddToCalendar);

const ModalContainer = styled.View`
  width: ${({ modalWidth }) => modalWidth};
  min-height: 150px;
  max-height: 220px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: ${({ dims }) => dims.height / 2 - 100}px;
  left: ${({ dims, modalWidth }) => dims.width / 2 - modalWidth / 2}px;
`;

const ModalButton = styled.TouchableHighlight`
  background-color: gold;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  margin: 20px 0;
`;

const Date = styled.Text`
  text-align: center;
  width: 100%;
  color: white;
  line-height: 14px;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const AddButton = styled.TouchableHighlight`
  background-color: grey;
  border-radius: 10px;
  height: 30px;
  margin-left: 20px;
  margin-right: 20px;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-weight: bold;
  width: 100%;
  color: white;
  line-height: 30px;
  font-size: 18px;
`;

const TabBottom = styled.View`
  width: 100%;
  height: 70;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  overflow: hidden;
  background-color: ${({ color }) => color};
`;

const ModalText = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-bottom: 10;
`;

const ModalCloseText = styled.Text`
  color: white;
  font-size: 20;
  text-align: center;
  line-height: 50;
`;
