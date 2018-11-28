import React from "react";
import { View, Keyboard } from "react-native";
import type {NavigationScreenProp} from 'react-navigation';
import styled from "styled-components";
import { AppContainer, subscribeTo } from "../appState";
import type { AppState } from "../appState";
import firebase, { auth } from "../firebase";
import { ScreenOuter, Spacer } from "../styles/layouts";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import ResultsHeader from "../components/Results/ResultsHeader";

type Props = {
  navigation: NavigationScreenProp<{}>,
  subscriptions: Array<{state: AppState, updateState: Function}>,
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
      .then(({user}) => {
        console.log(user);
        appState.updateState({user});
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
        appState.updateState({user: {
          id: newUser.user.uid,
          email: this.state.email
        }});
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

  modalWidth = this.props.subscriptions[0].state.dims.width - 100;

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
            <LoginButton
              accessibilityLabel="Login"
              onPress={this.onLoginPress}
            >
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

        <Modal
          dims={appState.state.dims}
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
 ${({leftPad}) => leftPad ? 'margin-left: 2px;' : 'margin-right: 2px;'}
`;

const Modal = styled.Modal`
  width: ${this.modalWidth};
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
