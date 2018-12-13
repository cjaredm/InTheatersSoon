// @flow
import React from "react";
import { Modal } from "react-native";
import styled from "styled-components";
import { Text } from "./Text";

type ConfirmModalProps = {
  visible: boolean,
  dims: { width: number },
  title: string,
  text: string,
  closeModal: Function,
  buttonText: string
};

// ! TODO: Make better modals! And get some better colors
export const ConfirmModal = (props: ConfirmModalProps) => (
  <Modal visible={props.visible} animationType="slide" transparent>
    <ModalContainer dims={props.dims}>
      <Text sizeType="title" colorType="background" textAlign="center">
        {props.title}
      </Text>
      <ModalText>{props.text}</ModalText>
      <ModalButton onPress={props.closeModal}>
        <ModalCloseText>{props.buttonText}</ModalCloseText>
      </ModalButton>
    </ModalContainer>
  </Modal>
);

ConfirmModal.defaultProps = {
  title: "Ooh No!",
  buttonText: "Close"
};

const ModalContainer = styled.View`
  min-height: 150px;
  max-height: 220px;
  margin: auto auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  border-color: white;
`;

const ModalButton = styled.TouchableHighlight`
  background-color: gold;
  border-radius: 10px;
  height: 50px;
  margin: 20px 0 0;
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
