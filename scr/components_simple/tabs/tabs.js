import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import { withNavigation } from 'react-navigation';
class tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList:[
        {
          name:"t1",
          routeName:"navigationA",
        },
        {
          name:"t2",
          routeName:"navigationB",
        },
        {
          name:"t3",
          routeName:"navigationC",
        }
      ]
    };
  }

  render() {
    var tab=this.state.tabList.map((item,index)=>{
      return(
        <TouchableOpacity key={index} style={s.tabsContainer} onPress={
          ()=>{
            this.props.navigation.navigate(item.routeName)
          }
        }>
        <View>
            <Text style={s.tab}>{item.name}</Text>
        </View>
        </TouchableOpacity>
      )
    })
    return (
      <View style={s.tabs}>
        {tab}
      </View>
    );
  }
}
const s=StyleSheet.create({
    tabs:{
        position:"absolute",
        width:"100%",
        height:40,
        bottom:0,
        display:"flex",
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:"row",
        backgroundColor:'rgb(55,55,55)',
    },
    tabsContainer:{
      flex:1,
      textAlign: "center",
      display:"flex",
      alignItems:'center',
      justifyContent: 'center',
    },  
    tab:{
      color:"rgb(255,0,0)"
    }
})
export default withNavigation(tabs);