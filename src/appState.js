// @flow
import React from "react";
import type { ComponentType } from "react";
import { Container, Subscribe } from "unstated";
import type { ContainersType } from "unstated";
import { Dimensions } from "react-native";
import hoistNonReactStatics from "hoist-non-react-statics";

export type TMDB_CONFIG = {
  change_keys: Array<string>,
  images: {
    backdrop_sizes: Array<string>,
    base_url: string,
    logo_sizes: Array<string>,
    poster_sizes: Array<string>,
    profile_sizes: Array<string>,
    secure_base_url: string,
    still_sizes: Array<string>
  }
};

export type UserType = {
  id: number,
  email: string,
  movies?: Array<{}> | Object
};

export type DIMS = {
  width: string,
  height: string
};

export type AppState = {
  TMDB_config: ?TMDB_CONFIG,
  user: ?UserType,
  dims: DIMS
};

type ImageUrlProps = {
  type: "poster" | "logo" | "backdrop",
  sizeIndex: number,
  path: string
};

export class AppContainer extends Container<AppState> {
  initialState = {
    user: null,
    TMDB_config: null,
    dims: Dimensions.get("window")
  };

  state = this.initialState;

  // TODO: I could totally make this global and pass in the config...
  getImageUrl = ({ type, sizeIndex, path }: ImageUrlProps) => {
    if (this.state.TMDB_config) {
      const {
        images: { secure_base_url, [type + "_sizes"]: size }
      } = this.state.TMDB_config;
      return secure_base_url + size[sizeIndex] + path;
    }
    return "";
  };

  updateState = (newState: {}) => this.setState(newState);
  resetState = () => this.setState(this.initialState);
}

export type AppStateSubscription = {
  state: AppState,
  updateState: Function,
  getImageUrl: Function,
  resetState: Function
};

export type SubscriptionTypes = Array<AppStateSubscription>;

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
