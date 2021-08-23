import axios from 'axios'
import {baseUrl} from './baseUrl'




let http = {}

http = axios.create({
    timeout: 9000,
    "baseURL" : baseUrl,
});
http.interceptors.request.use(config=>{
    config.headers.Authorization="Bearer "+window.localStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json;charset=UTF-8;multipart/form-data'
    config.headers['Accept'] = 'application/json;charset=UTF-8'
    return config;
})

export default http
