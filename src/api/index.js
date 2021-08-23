import http from '../config/httpConfig'


//登录
export function login(data){
    return http({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

//退出登录
export function logout(){
    return http({
        url: '/user/logout',
        method: 'post',
    })
}

//批量生成卡
export function batchGeneration(query){
    return http({
        url: '/card/batchGeneration',
        method: 'post',
        params: query
    })
}

//保存卡
export function saveCard(query){
    return http({
        url: '/card/card',
        method: 'post',
        data: query
    })
}

//获取批阅记录
export function subscriberCardList(query){
    return http({
        url: '/card/subscriberCardList',
        method: 'get',
        params: query
    })
}

//获取地区列表
export function getDistributionUnitList(){
    return http({
        url: '/area/getDistributionUnitList',
        method: 'get'
    })
}


//获取派发单位列表
export function getunitDistributionUnitList(){
    return http({
        url: '/unit/getDistributionUnitList',
        method: 'get'
    })
}

//导出卡列表
export function exportCard(data){
    return http({
        url: '/card/exportCard',
        method: 'post',
        data:data,
        responseType: 'blob'
    })
}

//修改订阅人信息
export function setSubscriber(data){
    return http({
        url: '/subscriber',
        method: 'put',
        data:data,
    })
}

//保存订阅人信息
export function saveSubscriber(data){
    return http({
        url: '/subscriber',
        method: 'post',
        data:data,
    })
}

//管理后台用户修改密码
export function changePassword(data){
    return http({
        url: '/user/changePassword',
        method: 'put',
        data:data,
    })
}


//导出订阅卡记录列表
export function exportSubscriberCardList(data){
    return http({
        url: '/card/exportSubscriberCardList',
        method: 'get',
        params:data,
        responseType: 'blob'
    })
}

//批量保存派发单位信息
export function batchSaveDistributionUnit(data){
    return http({
        url: '/unit/batchSaveDistributionUnit',
        method: 'post',
        data:data,
    })
}



