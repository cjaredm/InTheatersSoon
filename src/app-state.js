// @flow
/* eslint-disable react/no-unused-state */
import React from 'react';
import type {ComponentType} from 'react';
import {Dimensions} from 'react-native';

export type AppState = {
  user?: null | Object,
  dims: {
    width: string,
    height: string,
  }
};

const {
  Provider,
  Consumer: AppStateConsumer,
  // $FlowFixMe
} = React.createContext();

let instance: AppStateProvider;

class AppStateProvider extends React.Component<
  {children: React.isValidElement},
  AppState
  > {
  constructor(...args: Array<any>) {
    super(...args);
    const dims = Dimensions.get('window');
    console.log(dims);
    /** Exposed via context */
    this.state = {
      user: null,
      dims: dims || {},
    };
  }

  componentDidMount() {
    instance = this;
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

/**
 * Enhance with props {appState: AppState}
 */
const withAppState = (Inner: ComponentType<Object>) => {
  return (props: Object) => (
    <AppStateConsumer>
      {(appState: AppState) => <Inner appState={appState} {...props} />}
    </AppStateConsumer>
  );
};

/**
 * Expose AppState to the world!
 */
function getAppState(): AppState {
  return instance.state;
}

export {AppStateProvider, AppStateConsumer, withAppState, getAppState};
