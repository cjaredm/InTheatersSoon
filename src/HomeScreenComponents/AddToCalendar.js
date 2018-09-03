// @flow
import React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Modal
} from "react-native";
import styled from "styled-components";

// const buttonStyle = {
//   width: "100%",
//   height: 65,
//   borderTopLeftRadius: 0,
//   borderTopRightRadius: 0,
//   borderBottomLeftRadius: 10,
//   borderBottomRightRadius: 10,
//   overflow: "hidden"
// };

// const dateFormat = "YYYY-MM-DDTHH:mm";

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

  // toggleShowModal = (showModal: showModalProps): void => {
  //   if (!showModal) {
  //     this.setState({ showModal: false, error: null });
  //   } else {
  //     this.setState({ showModal });
  //   }
  // };

  // addEvent = async () => {
  //
  //   const releaseDate = new Date(this.props.releaseDate);
  //   const calendarDetails = {
  //     title: this.props.title,
  //     startDate: releaseDate,
  //     endDate: releaseDate,
  //     alarms: [{relativeOffset: 540}],
  //     allDay: true,
  //   };
  //
  //   createEventAsync(DEFAULT, calendarDetails)
  //     .then(eventId => this.toggleShowModal(true))
  //     .catch(error => this.setState({showModal: true, error}));
  // };

  modalWidth = this.props.dims.width - 100;

  styles = StyleSheet.create({
    date: {
      textAlign: "center",
      width: "100%",
      color: "white",
      lineHeight: 14,
      fontSize: 14,
      marginTop: 10,
      marginBottom: 5
    },
    buttonText: {
      textAlign: "center",
      fontWeight: "bold",
      width: "100%",
      color: "white",
      lineHeight: 30,
      fontSize: 18
    },
    modal: {
      width: this.modalWidth,
      minHeight: 150,
      maxHeight: 220,
      marginHorizontal: "auto",
      padding: 30,
      backgroundColor: "white",
      borderRadius: 10,
      position: "absolute",
      top: this.props.dims.height / 2 - 110,
      left: this.props.dims.width / 2 - this.modalWidth / 2
    },
    modalButton: {
      backgroundColor: "gold",
      borderRadius: 10,
      height: 50,
      width: "100%",
      marginVertical: 20
    },
    addButton: {
      backgroundColor: "grey",
      borderRadius: 10,
      width: 300,
      height: 30,
      marginLeft: 18
    }
  });

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
    return (
      <TabBottom color={this.props.color}>
        <Text style={this.styles.date}>{this.props.releaseDate}</Text>
        <TouchableHighlight
          onPress={() => {
            console.log("added something");
          }}
          style={this.styles.addButton}
        >
          <Text style={this.styles.buttonText}>Add To Calendar</Text>
        </TouchableHighlight>
        <Modal animationType="slide" transparent visible={this.state.showModal}>
          <View style={this.styles.modal}>
            {this.state.error ? this.failureModalText : this.successModalText}
            <TouchableHighlight
              onPress={() => null}
              style={this.styles.modalButton}
            >
              <ModalCloseText>CLOSE</ModalCloseText>
            </TouchableHighlight>
          </View>
        </Modal>
      </TabBottom>
    );
  }
}

const TabBottom = styled.View`
  width: 100%;
  height: 70;
  border-top-left-radius: 0;
  bordertoprightradius: 0;
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
  color: white,
  fontSize: 20,
  textAlign: center,
  lineHeight: 50
`;
