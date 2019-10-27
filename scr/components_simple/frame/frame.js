import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import Navigate from '../../components_simple/navigate/navigate'
import Tabs from '../../components_simple/tabs/tabs'
import routerConfig from '../../router/routerConfig'
class frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTab:false,//是否显示底部导航
      showNavigate:true,//是否显示顶部导航
      title:"",//标题
    };
  }
  componentDidMount = () => {
    this.init()
    this.didBlurSubscription = this.props.navigation.addListener('willFocus',
      (payload) => {
        this.init()
      }
    );
  };
  init(){
    var state=this.props.navigation.dangerouslyGetParent().state
    var routeName=state.routes[state.index].routeName
    var route=routerConfig.routers[routeName]
    this.setState({
      title:route.title||'',
      showTab:route.showTab||false,
      showNavigate:route.showNavigate===false?false:true
    })
  }
  render() {
    var showTab=this.state.showTab
    var showNavigate=this.state.showNavigate
    var title=this.state.title
    function tabsFn(){
      if(showTab){
        return(<Tabs></Tabs>)
      }else{
        return null
      }
    }
    function navigateFn(){
      if(showNavigate){
        return(<Navigate title={title}></Navigate>)
      }else{
        return null
      }
    }
    
    return (
      <View style={[s.page]}>
        {navigateFn()}
        <View style={[s.container,navigateFn()==null?s.nonePadding:{}]}>
          {this.props.children}
        </View> 
        {tabsFn()}
      </View>
    );
  }
}
const s=StyleSheet.create({
    page:{
        backgroundColor:"rgb(0,0,0)",
        height:"100%",
        width:"100%",
    },  
    container:{
        paddingTop:40,
        backgroundColor:"rgb(55,50,50)"
    },
    nonePadding:{
      paddingTop:0,
    }
})
export default withNavigation(frame);