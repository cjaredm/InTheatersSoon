import React from "react";
import { View, Button, Keyboard } from "react-native";
import firebase, { auth } from "../firebase";
import { SavedMovieList } from "./SavedMoviesList";
import styled from "styled-components";

type Props = {
  setUser: any,
  // user: any,
  // openHome: any,
  dims: any
};

export default class SettingsScreen extends React.Component<Props> {
  state = {
    email: "email1@email.com",
    password: "12345678",
    error: null,
    loading: false,
    showModal: false
  };

  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });
  // showModal = () => this.setState({ showModal: true });
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

  modalWidth = this.props.dims.width - 100;

  render() {
    // const { user, openHome } = this.props;
    const modalText = this.state.error
      ? this.state.error
      : "Ta'Done!! Told you it would be easy. Now go save some movies.";

    return (
      <Wrapper>
        <SavedMovieList dims={this.props.dims} />

        <Header>
          We'd love to send you notifications when your saved movies are in
          theaters soon.
        </Header>
        <Description>
          Little thing though, you gotta setup an account. Super easy, barely an
          inconvenience.
        </Description>

        <Input
          onTextChange={value => this.setEmail(value)}
          placeholder="Email..."
          value={this.state.email}
        />
        <Input
          onTextChange={value => this.setPassword(value)}
          placeholder="Password..."
          value={this.state.password}
        />
        <Button
          accessibilityLabel="Create Account"
          onPress={this.onLoginPress}
          title="Login"
          color="red"
        />
        <Button
          accessibilityLabel="Create Account"
          onPress={this.onCreateAccountPress}
          title="Create Account"
          color="blue"
        />

        <Modal
          dims={this.props.dims}
          modalWidth={this.modalWidth}
          visible={this.state.showModal}
          animationType="slide"
          transparent
        >
          <View>
            <ModalText>{modalText}</ModalText>
            <ModalButton onPress={this.closeModal}>
              <ModalCloseText>CLOSE</ModalCloseText>
            </ModalButton>
          </View>
        </Modal>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  width: 100%;
  margin-top: 100px;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Header = styled.Text`
  font-size: 20;
  text-align: center;
  width: 300px;
`;

const Description = styled.Text`
  font-size: 16px;
  text-align: center;
  width: 320px;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 85%;
  height: 40px;
  padding: 0 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-width: 1px;
  border-color: black;
`;

const Modal = styled.Modal`
  width: this.modalWidth;
  min-height: 150px;
  max-height: 220px;
  margin: 0 auto;
  padding: 30;
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
