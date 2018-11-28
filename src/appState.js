// @flow
import React from 'react';
import type {ComponentType} from 'react';
import {Container, Subscribe} from 'unstated';
import type {ContainersType} from 'unstated';
import { Dimensions } from "react-native";

export type AppState = {
  user?: null | Object,
  dims: {
    width: string,
    height: string
  }
};

export class AppContainer extends Container<AppState> {
  state = {
    dims: Dimensions.get("window"),
  };

  updateState = (newState: {}) => this.setState(newState);
}

export type Subscription = {
  state: {[string]: any},
  [string]: (...args: Array<any>) => ?Promise<void>,
};

export type Subscriptions = Array<Subscription>;
// $FlowFixMe eslint-disable-line react/display-name
export const subscribeTo = (containers: ContainersType): Function => (
  Inner: ComponentType<{}>
): ComponentType<{}> => (props: any) => (
    <Subscribe to={containers}>
      {(...subscriptions) => <Inner {...props} subscriptions={subscriptions} />}
    </Subscribe>
  );
