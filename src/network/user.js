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