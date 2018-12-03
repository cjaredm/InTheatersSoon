// @flow
import React from "react";
import type { ComponentType } from "react";
import { Container, Subscribe } from "unstated";
import type { ContainersType } from "unstated";
import { Dimensions } from "react-native";
import hoistNonReactStatics from "hoist-non-react-statics";

export type UserType = {
  id: number,
  email: string,
  movies?: Array<{}> | Object
};

export type AppState = {
  user: ?UserType,
  dims: {
    width: string,
    height: string
  }
};

export class AppContainer extends Container<AppState> {
  state = {
    user: null,
    dims: Dimensions.get("window")
  };

  updateState = (newState: {}) => this.setState(newState);
}

export type AppStateSubscription = Array<{
  state: AppState,
  updateState: Function
}>;

export type Subscription = {
  state: { [string]: any },
  [string]: (...args: Array<any>) => ?Promise<void>
};

export type Subscriptions = Array<Subscription>;
// $FlowFixMe eslint-disable-line react/display-name
export const subscribeTo = (containers: ContainersType): Function => (
  Inner: ComponentType<{}>
): ComponentType<{}> => {
  const SubscribeToContainers = (props: any) => (
    <Subscribe to={containers}>
      {(...subscriptions) => <Inner {...props} subscriptions={subscriptions} />}
    </Subscribe>
  );
  hoistNonReactStatics(SubscribeToContainers, Inner);
  return SubscribeToContainers;
};
