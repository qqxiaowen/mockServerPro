/*
 * @Author: xiaoWen
 * @Date: 2021-12-01 15:53:08
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-01 18:08:22
 */

import { Button, Card, Collapse, Form, Input, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import BreadcrumbBox from '../components/BreadcrumbBox';
import EmptyBox from '../components/EmptyBox';
import request from '../request';

import '../styles/category.scss';

const { TextArea } = Input;
const { Panel } = Collapse;

interface CategoryData {
  categoryName: string;
  desc: string;
  _id: string;
  project: {
    _id: string;
    projectName: string;
  };
}

interface InterfaceListItem {
  _id: string;
  interfaceName: string;
  desc: string;
  url: string;
  method: string;
  content: any;
  params: any;
  category: string;
}

const Category = (props: RouteComponentProps) => {
  const [categoryId, setCategoryId] = useState<string>();
  const [categoryData, setCategoryData] = useState<CategoryData>();
  const [formData] = Form.useForm();
  const [interfaceList, setInterfaceList] = useState<InterfaceListItem[]>([]);

  useEffect(() => {
    setCategoryId(props.history.location.search.split('=')[1]);
  }, [props.history]);

  useEffect(() => {
    if (!categoryId) return;
    getCategoryDetail();
    getInterfaceList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const getCategoryDetail = () => {
    request('get', '/category/detail/' + categoryId).then((res: any) => {
      setCategoryData(res.data);
      formData.setFieldsValue({ categoryName: res.data.categoryName, desc: res.data.desc });
    });
  };

  const getInterfaceList = () => {
    request('get', '/interface/' + categoryId).then((res: any) => {
      console.log('res---', res.data);
      setInterfaceList(res.data);
    });
  };

  const formDom = useMemo(() => {
    return (
      <Form form={formData}>
        <Form.Item name="categoryName" label="类别名称">
          <Input placeholder="请输入" maxLength={50} />
        </Form.Item>
        <Form.Item name="desc" label="类别描述">
          <TextArea placeholder="请输入" maxLength={500} />
        </Form.Item>
      </Form>
    );
  }, [formData]);

  const changeData = () => {
    const params = formData.getFieldsValue();
    request('put', '/category/' + categoryId, params).then(() => {
      message.success('修改成功');
      getCategoryDetail();
    });
  };

  const panelHeader = (obj: InterfaceListItem) => {
    console.log('obj----', obj);
    return (
      <div className="panel-header">
        <div className="interfaceName">{obj.interfaceName}</div>
        <div className="method">{obj.method}</div>
        <div className="url">{obj.url}</div>
      </div>
    );
  };

  const listDom = useMemo(() => {
    // if (!interfaceList.length) return '';
    // header={panelHeader(item)}
    if (!interfaceList.length) {
      return <EmptyBox />;
    }
    return (
      <Collapse>
        {interfaceList.map((item: InterfaceListItem) => (
          <Panel header={panelHeader(item)} key={item.interfaceName}>
            <div className="pannel-content">
              <Card>
                <div className="title">请求体</div>
                <div className="content">{item.params ? JSON.stringify(item.params) : '无'}</div>
              </Card>
              <Card>
                <div className="title">响应体</div>
                <div className="content">{item.content ? JSON.stringify(item.content) : '无'}</div>
              </Card>
              <Card>
                <div className="title">描述介绍</div>
                <div className="content">{item.desc ? JSON.stringify(item.desc) : '无'}</div>
              </Card>
              <Card>
                <div className="title">mock地址</div>
                <div className="content">
                  <div>{`/mock/${categoryData!.project._id}${item.url}`}</div>
                  <div style={{color: 'gray'}}>/mock/项目id/地址，不能添加动态路由</div>
                </div>
              </Card>
            </div>
          </Panel>
        ))}
      </Collapse>
    );
  }, [categoryData, interfaceList]);

  return categoryData?._id ? (
    <div className="category-page">
      <BreadcrumbBox data={[{ name: categoryData.project.projectName }, { name: categoryData.categoryName }]} />
      <div className="page-detail">
        {formDom}
        <Button onClick={changeData}>修改</Button>
      </div>
      <div className="page-list">{listDom}</div>
    </div>
  ) : (
    <EmptyBox />
  );
};

export default withRouter(Category);