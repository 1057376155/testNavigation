// import {createStackNavigator, createAppContainer} from 'react-navigation'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import routerConfig from './routerConfig';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    Easing,
    TouchableOpacity,
    Animated
} from 'react-native';

function generateRoute(path, screen) {
  return {
    path,
    screen
  }
}
var duration=routerConfig.defaultDuration
const stackNavigate = createStackNavigator(
  routerConfig.routers,
  {
  initialRouteName: 'page1',
  headerMode: 'none',
  mode: 'card',
  defaultNavigationOptions: {
    gesturesEnabled: false,
  },
  onTransitionStart(transitionProps,prevTransitionProps){
    var name=transitionProps.scene.route.routeName
    var preName=prevTransitionProps.scene.route.routeName
    if(routerConfig.routers[name].duration>-1&&routerConfig.routers[preName].duration>-1){
      //如果前后两个页面的过渡动画为0，则没有过渡动画
      duration=routerConfig.routers[name].duration
    }else{
      duration=routerConfig.defaultDuration
    }

  },
  onTransitionEnd(){
    duration=routerConfig.defaultDuration;
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: duration,
      easing: Easing.bezier(.44,.45,.65,.95),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }] };
    },
  }),
})

const Router = createAppContainer(stackNavigate)

export default Router
// export default createAppContainer(AppNavigator);