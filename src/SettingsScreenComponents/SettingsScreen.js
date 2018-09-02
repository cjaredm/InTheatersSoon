import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Modal,
  Button,
  Keyboard
} from "react-native";
import firebase, { auth } from "../firebase";
import { SavedMovieList } from "./SavedMoviesList";

export default class SettingsScreen extends React.Component {
  static propTypes = {
    setUser: PropTypes.func,
    user: PropTypes.object,
    openHome: PropTypes.func,
    dims: PropTypes.object
  };

  state = {
    email: "email1@email.com",
    password: "12345678",
    error: null,
    loading: false,
    showModal: false
  };

  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });
  showModal = () => this.setState({ showModal: true });
  closeModal = () => this.setState({ showModal: false, error: "" });

  onLoginPress = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });

    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response.user);
        this.props.setUser(response.user);
        this.setState({ loading: false, showModal: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, loading: false, showModal: true });
      });

    Keyboard.dismiss();
  };

  onCreateAccountPress = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref("userProfile")
          .child(newUser.user.uid)
          .set({
            email: this.state.email
          });
        this.setState({ loading: false, showModal: true });
        this.props.setUser({
          id: newUser.user.uid,
          email: this.state.email
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          error: error.message,
          loading: false,
          showModal: true
        });
      });

    Keyboard.dismiss();
  };

  onUpdatePress = () => {
    this.setState({ loading: true });
    const currentUser = firebase.auth().currentUser;
    currentUser
      .updateProfile({ id: 1, savedMovies: ["movie1", "movie2", "movie3"] })
      .then(response => {
        console.log("Update successful", firebase.auth());
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, loading: false, showModal: true });
      });

    Keyboard.dismiss();
  };

  modalWidth = this.props.dims.width - 100;

  styles = StyleSheet.create({
    container: {
      width: "100%",
      marginTop: 100,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    },

    header: {
      fontSize: 20,
      textAlign: "center",
      width: 300
    },
    description: {
      fontSize: 16,
      textAlign: "center",
      width: 320,
      marginBottom: 20
    },

    input: {
      width: "85%",
      height: 40,
      paddingHorizontal: 15,
      marginVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "black"
    },

    modal: {
      width: this.modalWidth,
      minHeight: 150,
      maxHeight: 220,
      marginHorizontal: "auto",
      padding: 30,
      backgroundColor: "white",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "black",
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
    }
  });

  render() {
    const { user, openHome } = this.props;
    const modalText = this.state.error
      ? this.state.error
      : "Ta'Done!! Told you it would be easy. Now go save some movies.";

    return (
      <View style={this.styles.container}>
        <SavedMovieList dims={this.props.dims} />

        <Text style={this.styles.header}>
          We'd love to send you notifications when your saved movies are in
          theaters soon.
        </Text>
        <Text style={this.styles.description}>
          Little thing though, you gotta setup an account. Super easy, barely an
          inconvenience.
        </Text>

        <TextInput
          placeholder="Email..."
          onTextChange={value => this.setEmail(value)}
          value={this.state.email}
          style={this.styles.input}
        />
        <TextInput
          placeholder="Password..."
          onTextChange={value => this.setPassword(value)}
          value={this.state.password}
          style={this.styles.input}
        />
        <Button
          title="Login"
          onPress={this.onLoginPress}
          color="red"
          accessibilityLabel="Create Account"
        />
        <Button
          title="Create Account"
          onPress={this.onCreateAccountPress}
          color="blue"
          accessibilityLabel="Create Account"
        />

        <Modal
          style={this.styles.modal}
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
        >
          <View style={this.styles.modal}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10
              }}
            >
              {modalText}
            </Text>
            <TouchableHighlight
              onPress={this.closeModal}
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
