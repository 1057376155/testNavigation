import {
    PixelRatio,
    Dimensions
  } from 'react-native';
let pixelRatio = PixelRatio.get();//返回设备的像素密度
let screenW = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width);//获取屏幕的宽度 px
const designWidth = 750.0; //标准宽度 iphone6
var autoSetProperty={
    "borderBottomWidth":{auto:true},
    "borderEndWidth":{auto:true},
    "borderLeftWidth":{auto:true},
    "borderRightWidth":{auto:true},
    "borderStartWidth":{auto:true},
    "borderTopWidth":{auto:true},
    "borderWidth":{auto:true},
    "bottom":{auto:true},
    "flexBasis":{auto:true},
    "fontSize":{auto:true},
    "height":{auto:true},
    "left":{auto:true},
    "margin":{auto:true},
    "marginBottom":{auto:true},
    "marginHorizontal":{auto:true},
    "marginLeft":{auto:true},
    "marginRight":{auto:true},
    "marginStart":{auto:true},
    "marginTop":{auto:true},
    "maxHeight":{auto:true},
    "maxWidth":{auto:true},
    "minHeight":{auto:true},
    "minWidth":{auto:true},
    "padding":{auto:true},
    "paddingBottom":{auto:true},
    "paddingHorizontal":{auto:true},
    "paddingLeft":{auto:true},
    "paddingRight":{auto:true},
    "paddingTop":{auto:true},
    "paddingVertical":{auto:true},
    "right":{auto:true},
    "top":{auto:true},
    "width":{auto:true},
}
var size={
    px(size){
        return parseFloat((screenW / designWidth * size).toFixed(2))/pixelRatio
    },
    autoSet(obj,noAutoList){
        // 自定转换
        for(var i in obj){
            if(obj[i] instanceof Object){
                for(var ii in obj[i]){
                    if(autoSetProperty[ii].auto&&this.isNum(obj[i][ii])){
                        // 存在自动转换列表中且是数字类型且没有设置非自动转换
                        if(noAutoList&&noAutoList[i][ii]&&noAutoList[i][ii]){
                            // 如果有有设置不转换该值，则什么都不做
                        }else{
                            // 进行转换
                            obj[i][ii]=this.px(obj[i][ii])
                        }
                    }
                }
            }
        }
        console.log(obj)
        return obj
    },
    isNum(num){
        return /\d/.test(num)
    }
    
}
export default size