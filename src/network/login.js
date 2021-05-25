import {request} from './request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
    })
}