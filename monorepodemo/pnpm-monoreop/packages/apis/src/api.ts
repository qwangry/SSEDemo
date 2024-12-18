import axios, { AxiosInstance } from 'axios';

const api:AxiosInstance = axios.create({
    headers:{
        'content-type':'application/json'
    }
})

api.interceptors.request.use(function (config){
    // token处理
    return config;
},function (error){
    return Promise.reject(error);
});

api.interceptors.response.use(function (response){
    console.log(17,response);
    if(response.status !== 200){
        Promise.reject(response);
    }   
    return response;    
},function (error){
    console.log(22,error.response);
    return Promise.reject(error);
});

export default api;