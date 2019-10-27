/*
 * @Author: 陈志陶_cor 
 * @Date: 2019-04-22 15:10:27 
 * @Last Modified by: 陈志陶_cor
 * @Last Modified time: 2019-06-03 14:59:53
 */
// http 初始化文件 ，包括 配置 http 的初始化
// 域名的初始化路径
var Http=require('./http').Http;//初始化 Http 请求接口
var httpEvent=require('./http_event');// 异步事件
var http=new Http({
    baseUrl:"http://49.51.86.58:3000/api/",//这里主要是判断是否是生产模式还是开发模式，如果开发模式就加上请求前缀/api,//如果是生产模式则不加
    getChangeRequestParameter:httpEvent.getChangeRequestParameter,//get 请求之前增加请求的key
    postChangeRequestParameter:httpEvent.postChangeRequestParameter,//post 请求之前
})
export default http

