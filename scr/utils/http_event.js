/*
 * @Author: 陈志陶_cor 
 * @Date: 2019-04-18 15:39:51 
 * @Last Modified by: 陈志陶_cor
 * @Last Modified time: 2019-09-20 18:00:22
 */
// 这是一个对http请求出现不同的code的处理
// 获取app
// var mockFN=require('../udApi/cor_mockData').mockFN;//获取mock 假数据
import db from './storage';
var loginTimeoutNum=0;//控制循环登录的次数，如果默认登录10次登录不上则停止去请求

var httpEventCode={
    // 请求事件返回码
    code200(data){
        //200拦截
        console.log(data,200)
    },
    code400(data){
        //400拦截
        console.log(data,400)
    }
}
function startRequest(o){
    //请求之前
    // o.request_o.udData.noLoading 为true时不显示loading
    if(!isOpenMock&&!fn.objHasProperty(o,'o.request_o.udData.noLoading').result){
        wx.showLoading({
            title: '加载中',
            mask:true
        })
    }
      
}
function endRequest(){
    // 请求之后
    // console.log('请求之后')
}
function changeData(res){
    // 修改返回的数据
    return res
}
function concurrentRequests(){
    // 当短时间内发起多个请求，结束之后触发该事件
    // console.log("多个请求结束之后")
    welfareSwitchOne=false;
}

function getChangeRequestParameter(get_o){
    // 请求之前增加请求的参数,加上key
    return new Promise((resolev,reject)=>{
        // resolev(post_o)
        db.get({key:'token'}).then((data)=>{
            get_o.headers={
                Authorization:'Bearer '+data.token
            }
            resolev(get_o)
        }).catch(()=>{
            resolev(get_o)
        })
    })
}
function postChangeRequestParameter(post_o){
    // post 请求之前
    return new Promise((resolev,reject)=>{
        // resolev(post_o)
        db.get({key:'token'}).then((data)=>{
            post_o.headers={
                Authorization:'Bearer '+data.token
            }
            resolev(post_o)
        }).catch(()=>{
            resolev(post_o)
        })
    })
}
export {
    getChangeRequestParameter,
    postChangeRequestParameter
} 