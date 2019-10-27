/*
 * @Author: 陈志陶_cor
 * @Date: 2019-04-17 16:00:13
 * @Last Modified by: 陈志陶_cor
 * @Last Modified time: 2019-10-24 10:45:08
 */

const axios=require('axios')
function Http(http_o) {
    //返回值 Object
    //参数说明
    // o.baseUrl 这个参数根据传入的基础路径会初始化http中的所有请求方法
    // ... 待扩展
    var requestArr=[];//请求次数
    return {
      // 这个对象是包含全部所有的请求
      async getFN(get_o) {
        //get 方法
        //参数说明
        // get_o.url 指的是请求的路径
        // params 接受 对象序列化 传参 即 将传入的 params（对象） 参数  序列化为 url 传参的方式如 xxx.com/api?id=1212&name=456
        // udData Object：即userDefined Data 用户自定义数据，这是一个扩展字段
        if(http_o.getChangeRequestParameter){
          // post请求之前，修改或增加请求参数
          get_o=http_o.getChangeRequestParameter(get_o)
          if(get_o.then){
            get_o=await get_o
          }
        }
        return new Promise((resolve, reject) => {
          Request({
            method: 'get',
            params:get_o.params||false,
            url: get_o.url,
            udData: get_o.udData, //预留扩展字段
            headers:get_o.headers||{'Content-type':'application/json'}
          }).then(data => {
            resolve(data);
          });
        });
      },
      async postFN(post_o) {
        //post 方法
        if(http_o.postChangeRequestParameter){
          // post请求之前，修改或增加请求参数
          post_o=http_o.postChangeRequestParameter(post_o)
          if(post_o.then){
            post_o=await post_o
          }
        }
        return new Promise((resolve, reject) => {
          Request({
            method: 'POST',
            url: post_o.url,
            data:post_o.data,
            udData: post_o.udData, //预留扩展字段
            headers:post_o.headers||{'Content-type':'application/json'}
          }).then(data => {
            resolve(data);
          });
        });
      }
    };
    function Request(request_o) {
      //总请求方法,这是一个被独立处理出来的方法，因为这个方法是一个比较特殊的方法，首先这个方法不应被暴露出来，
      // 然后因为根据项目的独特性，最底层的拦截、加密、权限的实现和代码都有所不同，这里应该独立处理，方便以后移植和复用
      //这个方法是所有请求方法的底层方法，具有错误码拦截，权限管理（鉴权）等 拦截的功能
      // 返回值 Object
      //参数说明
      // o.method 请求类型
      // o.url 请求路径
      // o.data 请求参数
      // o.baseUrl 基本路径
      // udData Object：即userDefined Data 用户自定义数据，这是一个扩展字段
      //              fullData 这个字段为真的话，将返回 服务端返回的所有数据，默认返回data
      requestArr.push(request_o);//将请求加入数组
      if(http_o.startRequest){
        http_o.startRequest(http_o);//事件委托,请求之前
      }
      return new Promise((resolve, reject) => {
        var requestConfig = {
          //請求對象
          method: request_o.method,
          url: http_o.baseUrl + request_o.url,
          data: request_o.data,
          headers: {
            'content-type': 'application/json' // 默认值
          },
        };
        if(request_o.headers)requestConfig['headers']=request_o.headers;//如果有params 加上
        if(request_o.params)requestConfig['params']=request_o.params;//如果有params 加上
        if (request_o.method === 'get') delete requestConfig.data;
        if(http_o.beforeDefindFlow&&!request_o.skip){
          //请求之前自定义流程,如果skip为true则跳过beforeDefindFlow
          resolve(http_o.beforeDefindFlow({requestConfig:requestConfig,http_o:http_o,Request:Request}));
          requestArr.splice(0,1);//因为被劫持，所以需要减去一个
          return;
        }
        axios(requestConfig).then((res)=>{
          if(http_o.changeData){
            // 如果有数据，则处理数据
            res=http_o.changeData(res)
          }
          if(http_o.httpEventCode&&http_o.httpEventCode['code'+res.status]){
            http_o.httpEventCode['code'+res.status](res);//事件委托,处理错误
          }
          if(http_o.endRequest){
            http_o.endRequest({...http_o,...res});//事件委托,请求之前
          }
          if(http_o.afterDefindFlow){
            //自定义流程
            resolve(http_o.afterDefindFlow({requestConfig:requestConfig,http_o:http_o,res:res,Request:Request}));
          }
          if (request_o.udData && request_o.udData.fullData === true) {
            // 如果这里的fullData 为真的话,将返回服务器返回的所有数据
            resolve(res);
          }
          // console.log(res,'res')
          resolve(res.data);
        }).catch((err)=>{
          // console.log(err,'.response')
          var code=err.response.status;//请求错误码
          if(http_o.httpEventCode&&http_o.httpEventCode['code'+code]){
            http_o.httpEventCode['code'+code](err);//事件委托,处理错误
          }
          reject(err);
        }).finally(()=>{
          //无论成功或者失败都会执行
          requestArr.splice(0,1);
          if(requestArr.length==0){
            // 批量请求全部完成
            if(http_o.startRequest){
              http_o.concurrentRequests();
            }
          }
        });
      });
    }
  }
export {Http} 
  