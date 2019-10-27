import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Router from './scr/router/router'
import { Provider } from 'mobx-react'
// import store from './src/store' 
import store from './scr/store/index' 
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
      <Provider store={store}>
        <Router ref={nav => {
            this.navigator = nav;
          }} />
      </Provider>
    );
  }
}
