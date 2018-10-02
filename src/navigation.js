// @flow
import { Animated, Easing } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreenComponents/HomeScreen";

export const routes = {
  mainStack: "mainStack",
  mainResults: "mainResults",
  accountStack: "accountStack",
  login: "login",
  accountSettings: "accountSettings",
  savedMovies: "savedMovies"
};

const navigationOptions = {
  // No header
  headerMode: "none",
  // No transitions between screen
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
  })
};

// The top level switch navigator
export const RootNavigator = createSwitchNavigator(
  {
    // Stack
    [routes.mainStack]: createStackNavigator(
      {
        [routes.mainResults]: HomeScreen
      },
      { initialRouteName: routes.mainResults, ...navigationOptions }
    ),

    //
    [routes.accountStack]: createStackNavigator(
      {
        [routes.login]: HomeScreen,
        [routes.accountSettings]: HomeScreen,
        [routes.savedMovies]: HomeScreen
      },
      { initialRouteName: routes.login, ...navigationOptions }
    )
  },
  { initialRouteName: routes.mainStack }
);
