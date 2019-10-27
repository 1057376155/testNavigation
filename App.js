import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Router from './scr/router/router'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: someRouteName })
      );
  }
  render() {
    return (
      <Router ref={nav => {
        this.navigator = nav;
      }} />
    );
  }
}
