import axios from 'axios'
import vueMain from '@/main.js'
import {baseUrl} from './baseUrl'




let http = {}

http = axios.create({
    timeout: 15000,
    "baseURL" : baseUrl,
});

/* 请求拦截器 */
http.interceptors.request.use(config=>{
    if(window.localStorage.getItem('token')!=null){
        config.headers.Authorization="Bearer "+window.localStorage.getItem('token');
    }else{
        config.headers.Authorization="Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDcyODA2Mzc3NjYxMDA5OTIwIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2MzAyOTYyOTUsInJvbGVzIjpbIueuoeeQhuWRmCJdLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoicGFnZTp0ZXN0In0seyJhdXRob3JpdHkiOiJidG46dGVzdDpxdWVyeSJ9LHsiYXV0aG9yaXR5IjoiYnRuOnRlc3Q6aW5zZXJ0In0seyJhdXRob3JpdHkiOiJwYWdlOm1vbml0b3I6b25saW5lIn0seyJhdXRob3JpdHkiOiJidG46bW9uaXRvcjpvbmxpbmU6cXVlcnkifSx7ImF1dGhvcml0eSI6ImJ0bjptb25pdG9yOm9ubGluZTpraWNrb3V0In1dLCJleHAiOjE2MzA5MDEwOTV9.6U92Rke-_VgD7EAn5TUcuEhllLCzgWsldxU0Y0p7_Lo";
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8;multipart/form-data'
    config.headers['Accept'] = 'application/json;charset=UTF-8'
    return config;
})


/* 响应拦截器 */
http.interceptors.response.use(function (response) {
    if (response.data.code == 5003 || response.data.code == 5002) {
        vueMain.$message.warning(response.data.message)
        setTimeout(()=>{
            window.localStorage.removeItem('token'); // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
            vueMain.$router.replace({
                path: '/login' // 到登录页重新获取token
            })
        },1500)
    }
  /*  else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
        Storage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
    }*/
    return response
}, function (error) {
    return Promise.reject(error)
})



    export default http
