import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Frame from "../../components_simple/frame/frame"
export default class page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Frame>
        <View>
            <Text onPress={()=>{
              this.props.navigation.navigate('page2')
            }}> 正 </Text>
        </View>
      </Frame>
    );
  }
}
