/*
 * @Author: xiaoWen
 * @Date: 2022-01-04 10:13:10
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-01-04 16:55:13
 */

import { Button, Drawer, Form, Input, InputNumber } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import '../../styles/wordPro/main.scss';
import { selfAudio } from './utils';

interface writeBoxArrItem {
  className: string;
  value: string;
}

const Main = () => {
  const [wordBoxArr, setWordBoxArr] = useState<string[]>([]);
  const [writeBoxArr, setWriteBoxArr] = useState<writeBoxArrItem[]>([]);
  const [resultLength, setResultLength] = useState<number>(20); // 一次要练习的字符长度

  const [isShowSettingDom, setIsShowSettingDom] = useState<boolean>(false);

  const fiterWorkArr = ['META', 'ALT', 'CONTROL', 'SHIFT', 'CAPSLOCK', 'TAB', 'ENTER']; // 需要过滤的特殊键
  const baseWork = {
    // 要练习的字符映射
    middleRight: ['H', 'J', 'K', 'L', ';'],
    middleLeft: ['A', 'S', 'D', 'F', 'G']
  };
  const wordInterval = 5; // 间隔

  const selfAudioObj = new selfAudio();

  useEffect(() => {
    getWorkText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isShowSettingDom) {
      return;
    }
    window.addEventListener('keydown', listenUserKeyDow);
    return () => {
      window.removeEventListener('keydown', listenUserKeyDow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeBoxArr, wordBoxArr, isShowSettingDom]);

  /** test音频 */
  // 创建音频上下文

  /** 获取随机字符 */
  const getWorkText = () => {
    let workArr = [...baseWork.middleRight];
    let arr = [];
    for (let i = 0; i < resultLength; i++) {
      arr.push(workArr[Math.round(Math.random() * (workArr.length - 1))]);
      if ((i + 1) % wordInterval === 0) {
        arr.push(' ');
      }
    }
    // console.log('arr: ', arr);
    setWordBoxArr(arr);
  };

  /** 监听用户输入 */
  const listenUserKeyDow = (e: { key: string }) => {
    let work = e.key.toLocaleUpperCase();
    if (fiterWorkArr.includes(work)) {
      return;
    }

    let arr = [...writeBoxArr];
    // console.log(arr, writeBoxArr,wordBoxArr, wordBoxArr[arr.length], work);
    if (work === 'BACKSPACE') {
      // 删除键删除输入的单词
      arr.pop();
    } else {
      if (wordBoxArr[arr.length] === work) {
        arr.push({ className:  'success', value: work });
        selfAudioObj.successSay();
      } else {
        arr.push({ className:  'error', value: work });
        selfAudioObj.errorSay();
      }
    }
    setWriteBoxArr(arr);
  };

  /** 设置 */
  const settingDom = useMemo(() => {
    const hideDrawer = () => {
      setIsShowSettingDom(false);
      getWorkText();
      setWriteBoxArr([]);
    };
    return (
      <>
        <Button type="primary" className="setting-button" onClick={() => setIsShowSettingDom(true)}>
          设置
        </Button>
        <Drawer style={{ marginTop: 48 }} title="设置" onClose={hideDrawer} visible={isShowSettingDom} closable={false}>
          <Form>
            <Form.Item label="字符数量">
              <InputNumber min={20} max={9999} value={resultLength} onChange={val => setResultLength(val)} placeholder="请输入" />
            </Form.Item>
          </Form>
          <Button type="primary" onClick={hideDrawer}>
            确定
          </Button>
        </Drawer>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowSettingDom, resultLength]);

  const writeDom = useMemo(() => {
    return (
      <div className="word-main">
        <div className="word-box">
          {wordBoxArr.map((item: any, index: number) => (
            <div className="item" key={index}>
              {item}
            </div>
          ))}
        </div>
        <div className="write-box">
          {writeBoxArr.map((item: writeBoxArrItem, index: number) => (
            <div className={`item ${item.className}`} key={index}>
              {item.value}
            </div>
          ))}
        </div>
      </div>
    );
  }, [wordBoxArr, writeBoxArr]);

  return (
    <div className="word-page">
      {settingDom}
      {writeDom}
    </div>
  );
};

export default Main;
