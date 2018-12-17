// @flow
import React from "react";
import { View, Text, Modal } from "react-native";
import styled from "styled-components";
import type { AppStateSubscription } from "../appState";
import firebase from "../firebase";
import type { MovieType } from "./Results/MovieItem";
import { ConfirmModal } from "./modals";

type Props = {
  appState: AppStateSubscription,
  movie: MovieType,
  color: string,
  dims: any
};

type State = {
  showModal: boolean,
  error: any
};

export default class AddToCalendar extends React.Component<Props, State> {
  state = {
    showModal: false,
    error: null
  };

  saveMovie = (movie: Object) => {
    const {
      state: { user }
    } = this.props.appState;

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
      <Text>Date: {this.props.movie.release_date}</Text>
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
        <Date>{movie.release_date}</Date>
        <AddButton onPress={() => this.saveMovie(movie)}>
          {/* TODO: Make this change if we know the movie is already saved */}
          <ButtonText>Get Notified</ButtonText>
        </AddButton>
        <ConfirmModal
          closeModal={() => this.setState({ showModal: false })}
          visible={this.state.showModal}
          text="This is the modal text."
          animationType="slide"
          buttonText="CLOSE"
          title="Hooray!"
          dims={dims}
          transparent
        />

        {/* Eww. Get rid of this success modal */}
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
  width: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: white;
  line-height: 30px;
  font-size: 18px;
`;

const TabBottom = styled.View`
  width: 100%;
  height: 70px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  background-color: ${({ color }) => color};
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
