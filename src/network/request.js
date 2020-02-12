import axios from 'axios'

export function request(config) {
  // 1创建实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })
  // 2.1axios请求拦截器
  //若不return出去，则会被拦截
  //1、可以对信息做一些处理
  //2、在界面上显示一个请求图标
  //3、某些网络请求。必须携带一些特殊的信息
  instance.interceptors.request.use(config=>{
    console.log(config);
    return config
  },error => {
    console.log(err);
  })
  //2.2相应拦截,也要return出去
  //1、可以对数据进行处理
  instance.interceptors.response.use(res=>{
    console.log(res);
    return res.data
  },err=>{
    console.log(err);
  })

  //发送真正的网络请求
  return instance(config)
}
