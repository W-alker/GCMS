import { request } from './request'

export function getSchoolName() {
    return request({
        url: '/getSchoolName',
        method: 'put',
    })
}

export function getVerifyCode(email) {
    return request({
        url: '/getVerifyCode',
        method:'post',
        data: {
            email
        }
    })
}

export function resetPwd(data) {
    return request({
        url: '/resetPwd',
        method:'post',
        data: data
    })
}