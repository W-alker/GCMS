import axios from 'axios'

// ES6 Promise的封装
export function request(options) {
    return new Promise((resolve, reject) => {
        // 1.创建axios的实例对象
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8100',
            timeout: 3000,
        })

        // 过滤器(拦截器)
        instance.interceptors.response.use(res => {
            if (res.status === 401)
                return reject('错误状态码!')
            if(res.status === 500)
                return reject('服务器错误!')
            return res.data
        }, err => {
            //超时
            if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
                // eslint-disable-next-line
                return reject('请求超时！')
            }
            return reject(err)
        })

        // 通过实例发送网络请求
        instance(options)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
    })
}
