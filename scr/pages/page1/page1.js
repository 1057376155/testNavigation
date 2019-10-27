import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Frame from "../../components_simple/frame/frame"
import http from '../../utils/http_install';
export default class page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    this.login();
  }
  login(){
    http.postFN({
      url:'login',
      data:{
        name:343,
        pwd:2343
      }
    }).then((r)=>{
      console.log(r,'rrrrr')
    })
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
