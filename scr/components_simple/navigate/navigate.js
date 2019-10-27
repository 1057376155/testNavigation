import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

class navigate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBack:true
    };
  }
  componentDidMount(){
    this.init()
    this.didBlurSubscription = this.props.navigation.addListener('willFocus',
      (payload) => {
        this.init()
      }
    );
  }
  componentWillUnmount(){
    this.didBlurSubscription.remove();
  }
  init(){
    var index=this.props.navigation.dangerouslyGetParent().state.index
    if(index==0){
      this.setState({
        showBack:false
      })
    }
  }
  render() {
   
    return (
      <View style={s.head}>
        <View>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.goBack()
        }}>
          <Image style={[s.back,!this.state.showBack?s.none:'']} source={require('./image/back.png')}></Image>
        </TouchableOpacity>
        </View>
        <Text style={s.title}> {this.props.title} </Text>
      </View>
    );
  }
}
export default withNavigation(navigate);
const s=StyleSheet.create({
  head:{
    position:"absolute",
    zIndex:2,
    width:"100%",
    height:40,
    backgroundColor:"rgb(100,100,100)",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
  },
  back:{
    width:20,
    height:35,
    marginHorizontal:10,
    margin:10,
  },
  none:{
    display:"none"
  },
  title:{
    flex:1,
    textAlign:"center",
    color:"rgb(255,255,255)"
  }
})