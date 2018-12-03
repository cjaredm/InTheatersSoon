// @flow
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";

export const routes = {
  mainStack: "mainStack",
  home: "home",
  accountStack: "accountStack",
  login: "login",
  accountSettings: "accountSettings",
  savedMovies: "savedMovies"
};

const stackOptions = {
  // No header
  headerMode: "none"
  /* // No transitions between screen
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
  })*/
};

// The top level switch navigator
export const RootNavigator = createSwitchNavigator(
  {
    // Stack
    [routes.mainStack]: createStackNavigator(
      {
        [routes.home]: HomeScreen
      },
      { initialRouteName: routes.home, ...stackOptions }
    ),

    //
    [routes.accountStack]: createStackNavigator(
      {
        [routes.login]: LoginScreen,
        [routes.savedMovies]: SettingsScreen,
        [routes.accountSettings]: SettingsScreen
      },
      { initialRouteName: routes.login }
    )
  },
  { initialRouteName: routes.mainStack }
);
