import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Modal,
  Dimensions
} from "react-native";

const buttonStyle = {
  width: "100%",
  height: 65,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  overflow: "hidden"
};

const dateFormat = "YYYY-MM-DDTHH:mm";

export default class AddToCalendar extends React.Component {
  static propTypes = {
    calendarAccess: PropTypes.bool,
    title: PropTypes.string,
    releaseDate: PropTypes.string,
    dims: PropTypes.object
  };

  state = {
    showModal: false,
    error: null
  };

  toggleShowModal = showModal => {
    if (!showModal) {
      this.setState({ showModal: false, error: null });
    } else {
      this.setState({ showModal });
    }
  };

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
    bottomTab: {
      width: "100%",
      height: 70,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      overflow: "hidden",
      backgroundColor: this.props.color
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
      <Text
        style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}
      >
        Calendar Event Added:
      </Text>
      <Text>Title: {this.props.title}</Text>
      <Text>Date: {this.props.releaseDate}</Text>
      <Text>Alert: 9 AM</Text>
    </View>
  );

  failureModalText = (
    <View>
      <Text
        style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}
      >
        Sorry, something went wrong.
      </Text>
    </View>
  );

  render() {
    return (
      <View style={this.styles.bottomTab}>
        <Text style={this.styles.date}>{this.props.releaseDate}</Text>
        <TouchableHighlight
          onPress={this.addEvent}
          style={this.styles.addButton}
        >
          <Text style={this.styles.buttonText}>Add To Calendar</Text>
        </TouchableHighlight>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
        >
          <View style={this.styles.modal}>
            {this.state.error ? this.failureModalText : this.successModalText}
            <TouchableHighlight
              onPress={() => this.toggleShowModal(false)}
              style={this.styles.modalButton}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                  lineHeight: 50
                }}
              >
                CLOSE
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}
