/*
 * @Description: xiaoWen
 * @Date: 2021-11-03 17:03:23
 * @LastEditTime: 2021-12-02 14:01:50
 * @FilePath: /liz-qywechat-danone-gt-web/www/src/request/index.ts
 */
import { message } from 'antd';
import axios from 'axios';
// import { storage, EnumStorageContent } from '../utils/storage';

axios.create({
  baseURL: 'https://api.example.com', // TODO 处理环境变量改参
  timeout: 60000, // 超过60s
  headers: {}
});

const request = (reqType: 'get' | 'post' | 'delete' | 'put', url: string, params?: any, callback?: () => void) => {
  return new Promise((resolve, reject) => {
    http(reqType, process.env.REACT_APP_REQUEST_HEARD + url, params)
      ?.then(response => {
        const { status, data } = response;
        const { code, msg } = data;
        if (status !== 200) {
          message.error('请求有点小问题！');
          reject(data || {});
          return;
        }
        if (code !== 200) {
          message.error(msg || '请求有点小问题！！！');
          reject(data || {});
          return;
        }
        resolve(data);
        if (callback) {
          callback();
        }
      })
      .catch((err: any) => {
        console.log('err: ', err);
        message.error(err.toString());
      });
  });
};

const http = (reqType: 'get' | 'post' | 'delete' | 'put', url: string, params?: any) => {
  if (reqType === 'get') {
    return axios.get(url, { params: params || '' });
  }
  if (reqType === 'delete') {
    return axios.delete(url, { params: params || '' });
  }
  if (reqType === 'post' || reqType === 'put') {
    return axios({
      method: reqType,
      url,
      data: params || {}
    });
  }
};

export default request;
