// @flow
import React from "react";
import { View, Text, Modal } from "react-native";
import styled from "styled-components";

type Props = {
  color: string,
  title: string,
  releaseDate: string,
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

  modalWidth = this.props.dims.width - 100;

  successModalText = (
    <View>
      <ModalText>Calendar Event Added:</ModalText>
      <Text>Title: {this.props.title}</Text>
      <Text>Date: {this.props.releaseDate}</Text>
      <Text>Alert: 9 AM</Text>
    </View>
  );

  failureModalText = (
    <View>
      <ModalText>Sorry, something went wrong.</ModalText>
    </View>
  );

  render() {
    const { color, releaseDate, dims } = this.props;
    const {
      state: { showModal, error },
      successModalText,
      failureModalText,
      modalWidth
    } = this;

    return (
      <TabBottom color={color}>
        <Date>{releaseDate}</Date>
        <AddButton
          onPress={() => {
            console.log("added something");
          }}
        >
          <ButtonText>Add To Calendar</ButtonText>
        </AddButton>
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
  width: 300px;
  height: 30px;
  margin-left: 18px;
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
