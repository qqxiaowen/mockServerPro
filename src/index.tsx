/*
 * @Description: xiaoWen
 * @Date: 2021-11-03 13:57:50
 * @LastEditTime: 2021-11-10 10:55:31
 * @FilePath: /liz-qywechat-danone-gt-web/www/src/index.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import reportWebVitals from './reportWebVitals';

moment.locale('zh-cn');

message.config({
  top: 100,
});

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

// reportWebVitals();
