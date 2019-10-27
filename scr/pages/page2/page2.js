import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Frame from "../../components_simple/frame/frame"
export default class page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Frame>
          <View>
              <Text> 正2 </Text>
          </View>
      </Frame>
    );
  }
}
