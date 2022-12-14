/*
 * @Author: xiaoWen
 * @Date: 2021-12-02 11:14:36
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-09 11:40:47
 */

import { Button, Form, Input, message, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BreadcrumbBox from '../components/BreadcrumbBox';
import request from '../request';
import { EMethod, EnumProjectRoute, methodArr } from '../utils/tsMap';

const { TextArea } = Input;
const { Option } = Select;

export interface InterfaceData {
  _id: string;
  interfaceName: string;
  desc: string;
  url: string;
  method: EMethod;
  content: any;
  params: any;
  category: {
    _id: string;
    categoryName: string;
  };
  project: {
    _id: string;
    projectName: string;
  };
}

const Interface = (props: RouteComponentProps) => {
  const [interfaceId, setInterfaceId] = useState<string>();
  const [interfaceData, setInterfaceData] = useState<InterfaceData>();
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
      setInterfaceData(res.data);
      const { interfaceName, desc, url, method, content, params } = res.data;
      formData.setFieldsValue({
        interfaceName,
        desc,
        url,
        method,
        content: content,
        params: params
      });
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
      // getInterfaceData();
      setTimeout(() => {
        props.history.goBack();
      }, 1000);
    });
  };

  const formDom = useMemo(() => {
    return (
      <Form form={formData}>
        <Form.Item name="interfaceName" label="名称">
          <Input placeholder="请输入" maxLength={50} />
        </Form.Item>
        <Form.Item name="url" label="地址">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="method" label="请求方式">
          <Select placeholder="请输入">
            {methodArr.map((item: EMethod) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="params" label="请求体">
          <TextArea placeholder="请输入" autoSize={true} />
        </Form.Item>
        <Form.Item name="content" label="响应体">
          <TextArea placeholder="请输入" autoSize={true} />
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <TextArea placeholder="请输入" autoSize={true} />
        </Form.Item>
      </Form>
    );
  }, [formData]);

  return (
    <div className="category-page">
      <BreadcrumbBox
        data={[
          { name: interfaceData?.project.projectName || '-', url: EnumProjectRoute.home + '?id=' + interfaceData?.project._id },
          { name: interfaceData?.category.categoryName || '-', url: EnumProjectRoute.category + '?id=' + interfaceData?.category._id },
          { name: interfaceData?.interfaceName || '-' }
        ]}
      />
      <div className="page-detail">
        {formDom}
        <Button onClick={changeData}>修改</Button>
      </div>
    </div>
  );
};

export default withRouter(Interface);
