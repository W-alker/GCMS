import { request } from './request'

export function checkToken() {
    return request({
        url: '/user',
        method: 'post',
        withCredentials: true
    })
}

export function initInfo() {
    return request({
        url: '/user/initInfo',
        method: 'get',
        withCredentials: true
    })
}

export function changePwd(data) {
    return request({
        url: '/user/changePwd',
        method: 'post',
        data: data,
        withCredentials: true
    })
}

export function changeInfo(data) {
    return request({
        url: '/user/changeInfo',
        method: 'post',
        data: data,
        withCredentials: true
    })
}