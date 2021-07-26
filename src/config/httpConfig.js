import axios from 'axios'
import {baseUrl} from './baseUrl'




let http = {}
let source=null
export function cancelRequest(){
    if(typeof source ==='function'){
        source('终止请求')
    }
}

http = axios.create({
    timeout: 9000,
    "baseURL" : baseUrl,
    cancelToken: axios.CancelToken(function executor(c) {
       source = c
    }),
});
http.interceptors.request.use(config=>{
    config.headers.Authorization=window.localStorage.getItem('userInfo');
    config.headers['Content-Type'] = 'application/json;charset=UTF-8;multipart/form-data'
    config.headers['Accept'] = 'application/json;charset=UTF-8'
    return config;
})

export {http}
