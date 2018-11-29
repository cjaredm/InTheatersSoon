import React from "react";
import { Modal, Keyboard } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import styled from "styled-components";
import { AppContainer, subscribeTo } from "../appState";
import type { AppState } from "../appState";
import firebase, { auth } from "../firebase";
import { ScreenOuter, Spacer } from "../styles/layouts";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import ResultsHeader from "../components/Results/ResultsHeader";
import { ConfirmModal } from "../components/modals";

type Props = {
  navigation: NavigationScreenProp<{}>,
  subscriptions: Array<{ state: AppState, updateState: Function }>
};

class LoginScreen extends React.Component<Props> {
  state = {
    email: "email1@email.com",
    password: "12345678",
    error: null,
    loading: false,
    showModal: false
  };

  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });
  closeModal = () => this.setState({ showModal: false, error: "" });

  onLoginPress = () => {
    const [appState] = this.props.subscriptions;
    const { email, password } = this.state;
    this.setState({ loading: true });

    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
        appState.updateState({ user });
        this.setState({ loading: false, showModal: true });
      })
      .catch(error => {
        // TODO ERROR HANDLING
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
        appState.updateState({
          user: {
            id: newUser.user.uid,
            email: this.state.email
          }
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

  render() {
    const [appState] = this.props.subscriptions;
    const modalText = this.state.error
      ? this.state.error
      : "Ta'Done!! Told you it would be easy. Now go save some movies.";

    return (
      <ScreenOuter>
        <TitleSection isLoggedIn={false} navigation={this.props.navigation} />
        <Spacer />

        <Wrapper>
          <Header>
            We'd love to send you notifications when your saved movies are in
            theaters soon.
          </Header>
          <Description>
            Little thing though, you gotta setup an account. Super easy, barely
            an inconvenience.
          </Description>

          <Spacer />

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

          <ButtonContainer>
            <LoginButton accessibilityLabel="Login" onPress={this.onLoginPress}>
              Login
            </LoginButton>
            <LoginButton
              leftPad
              accessibilityLabel="Create Account"
              onPress={this.onCreateAccountPress}
            >
              Create Account
            </LoginButton>
          </ButtonContainer>
        </Wrapper>

        <ConfirmModal
          visible={this.state.showModal}
          dims={appState.state.dims}
          animationType="slide"
          text={modalText}
          buttonText="CLOSE"
          closeModal={this.closeModal}
          transparent
        />
      </ScreenOuter>
    );
  }
}

export default subscribeTo([AppContainer])(LoginScreen);

const Wrapper = styled.View`
  padding: 0 20px;
`;

const TitleSection = styled(ResultsHeader)`
  margin: 0 20px;
`;

const Header = styled(Text)`
  font-size: 20px;
  text-align: center;
`;

const Description = styled(Text)`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  margin-top: auto;
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

const LoginButton = styled(Button)`
  flex: 1;
  ${({ leftPad }) => (leftPad ? "margin-left: 2px;" : "margin-right: 2px;")};
`;
