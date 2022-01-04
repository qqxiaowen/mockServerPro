/*
 * @Author: xiaoWen
 * @Date: 2021-11-08 15:45:55
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-01-04 10:30:58
 */

/** 项目localStorage里存的内容 */
enum EnumStorageContent {
  userInfo = 'userInfo'
}

/** 项目的路由 */
enum EnumProjectRoute {
  home = '/home',
  category = '/category',
  interface = '/interface',
  wordMain = '/word/main'
}

/** 请求方式 */
enum EMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE'
}

const methodArr = [EMethod.get, EMethod.post, EMethod.put, EMethod.delete];

export { EnumStorageContent, EnumProjectRoute, EMethod, methodArr };
