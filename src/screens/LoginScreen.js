import React from "react";
import { Keyboard } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import styled from "styled-components";
import { AppContainer, subscribeTo } from "../appState";
import type { SubscriptionTypes } from "../appState";
import firebase, { auth } from "../firebase";
import { ScreenOuter, Spacer } from "../styles/layouts";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ConfirmModal } from "../components/modals";
import { routes } from "../navigation";
import { NavHeader } from "../components/NavHeader";

type Props = {
  navigation: NavigationScreenProp<{}>,
  subscriptions: SubscriptionTypes
};

class LoginScreen extends React.Component<Props, {}> {
  static navigationOptions = ({ navigation }) => ({
    header: () => (
      <NavHeader
        nav={navigation}
        left={{
          content: <Text>Back</Text>,
          onPress: () => navigation.navigate(routes.home)
        }}
        right={{}}
      />
    )
  });
  state = {
    email: "",
    password: "",
    error: null,
    loading: false,
    showModal: false
  };

  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });
  closeModal = () => {
    this.setState({ showModal: false, error: "" });
    this.props.navigation.navigate(routes.savedMovies);
  };

  onLoginPress = async () => {
    const [appState] = this.props.subscriptions;
    const { email, password } = this.state;
    this.setState({ loading: true });

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const snapShot = await firebase
        .database()
        .ref(`/users/${user.uid}`)
        .once("value");
      const data = snapShot.val() && snapShot.val();

      appState.updateState({
        user: {
          id: user.uid,
          email: user.email,
          refreshToken: user.refreshToken,
          ...data,
          movies: Object.values(data.movies)
        }
      });
      this.setState({ loading: false, showModal: true });
    } catch (errors) {
      // TODO ERROR HANDLING Component (ErrorList)
      this.setState({ error: errors.message, loading: false, showModal: true });
    }
    Keyboard.dismiss();
  };

  onCreateAccountPress = async () => {
    const [appState] = this.props.subscriptions;
    const { email, password } = this.state;
    this.setState({ loading: true });

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const initialUser = {
          email: user.email,
          id: user.uid,
          movies: [{ id: 1000 }]
        };

        firebase
          .database()
          .ref(`/users/${user.uid}`)
          .set(initialUser)
          .then(error => {
            if (error) throw new Error(error);
          });

        this.setState({ loading: false, showModal: true });
        appState.updateState({
          user: initialUser
        });
      })
      .catch(error => {
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
        <Spacer />
        <Title>Reel TIme Movies</Title>
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
            name="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={this.setEmail}
            placeholder="Email..."
            value={this.state.email}
          />
          <Input
            name="password"
            textContentType="password"
            onChangeText={this.setPassword}
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
          title="Hooray!"
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

const Title = styled(Text).attrs({
  sizeType: "heading",
  textAlign: "center"
})`
  margin-bottom: 10px;
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
