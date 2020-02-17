import axios from 'axios'

export function request(config) {
  // 1创建实例
  const instance=axios.create({
    // baseURL : 'http://123.207.32.32:8000/api/hy',
    baseURL : 'http://106.54.54.237:8000/api/hy',
    timeout:5000
  })
  // 2.1axios请求拦截器
  instance.interceptors.request.use(config=>{
    // console.log(config);
    return config
  },error => {
    // console.log(err);
  })
  //2.2响应拦截,也要return出去
  //1、可以对数据进行处理
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data
  },err=>{
    // console.log(err);
  })

  //发送真正的网络请求
  return instance(config)
}
