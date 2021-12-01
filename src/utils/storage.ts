/*
 * @Description: xiaoWen
 * @Date: 2021-11-06 16:50:59
 * @LastEditTime: 2021-11-08 15:51:53
 * @FilePath: /liz-qywechat-danone-gt-web/www/src/utils/storage.ts
 */

import { EnumStorageContent } from "./tsMap";

const storage = {
  /** 获取string格式 */
  getItem: (key: EnumStorageContent): string => {
    return localStorage.getItem(key) || '';
  },
  /** 获取[]|{}格式 */
  getItemParse: (key: EnumStorageContent, type: 'arr' | 'obj'): any => {
    const defaultVal = type === 'arr' ? '[]' : '{}';
    return JSON.parse(localStorage.getItem(key) || defaultVal);
  },
  setItem: (key: EnumStorageContent, val: string): void => {
    localStorage.setItem(key, val);
  },
  removeItem: (key: EnumStorageContent): void => {
    localStorage.removeItem(key);
  }
}

export {
  storage,
  EnumStorageContent
};
