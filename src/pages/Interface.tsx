/*
 * @Author: xiaoWen
 * @Date: 2021-12-02 11:14:36
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-02 14:16:33
 */

import { Button, Form, Input, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BreadcrumbBox from '../components/BreadcrumbBox';
import request from '../request';

const { TextArea } = Input;
export interface InterfaceData {
  _id: string;
  interfaceName: string;
  desc: string;
  url: string;
  method: string;
  content: any;
  params: any;
  category: string;
}

const Interface = (props: RouteComponentProps) => {
  const [interfaceId, setInterfaceId] = useState<string>();
  // const [interfaceData, setInterfaceData] = useState<InterfaceData>();
  const [formData] = Form.useForm();

  useEffect(() => {
    setInterfaceId(props.history.location.search.split('=')[1]);
  }, [props.history.location.search]);

  useEffect(() => {
    if (!interfaceId) return;
    getInterfaceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interfaceId]);

  const getInterfaceData = () => {
    request('get', '/interface/detail/' + interfaceId).then((res: any) => {
      // setInterfaceData(res.data);
      const { interfaceName, desc, url, method, content, params } = res.data;
      formData.setFieldsValue({ interfaceName, desc, url, method, content, params });
    });
  };

  const changeData = () => {
    const params = formData.getFieldsValue();
    for (let key in params) {
      if (!params[key]) {
        params[key] = '';
      }
    }

    console.log('changeData', params);
    request('put', '/interface/' + interfaceId, params).then(() => {
      message.success('修改成功');
      getInterfaceData();
    });
  };

  const formDom = useMemo(() => {
    return (
      <Form form={formData}>
        <Form.Item name="interfaceName" label="名称">
          <Input placeholder="请输入" maxLength={50} />
        </Form.Item>
        <Form.Item name="url" label="地址">
          <Input placeholder="请输入"/>
        </Form.Item>
        <Form.Item name="method" label="请求方式">
          <Input placeholder="请输入" maxLength={50} />
        </Form.Item>
        <Form.Item name="params" label="请求体">
          <TextArea placeholder="请输入" autoSize={true}/>
        </Form.Item>
        <Form.Item name="content" label="响应体">
          <TextArea placeholder="请输入" autoSize={true}/>
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <TextArea placeholder="请输入" autoSize={true}/>
        </Form.Item>
      </Form>
    );
  }, [formData]);

  return (
    <div className="category-page">
      <BreadcrumbBox data={[{ name: 'name' }]} />
      <div className="page-detail">
        {formDom}
        <Button onClick={changeData}>修改</Button>
      </div>
    </div>
  );
};

export default withRouter(Interface);
