/*
 * @Author: xiaoWen
 * @Date: 2021-11-30 17:57:42
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-02 18:22:24
 */

import { Button, Form, Input, message, Popconfirm, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BreadcrumbBox from '../components/BreadcrumbBox';
import EmptyBox from '../components/EmptyBox';

import request from '../request';

import '../styles/home.scss';
import { EnumProjectRoute } from '../utils/tsMap';

const { TextArea } = Input;

interface HomeProps extends RouteComponentProps {
}

interface ProjectData {
  _id: string;
  projectName: string;
  desc: string;
}

interface categoryListDataItem {
  categoryName: string;
  project: string;
  desc: string;
  _id: string;
}

const Home = (props: HomeProps) => {

  const [projectData, setProjectData] = useState<ProjectData>();
  const [categoryListData, setCategoryListData] = useState<categoryListDataItem[]>([]);
  const [selsectProjectId, setSelsectProjectId] = useState<string>();

  const [formData] = Form.useForm();

  useEffect(() => {
    if (!props.history.location.search) return;
    setSelsectProjectId(props.history.location.search.split('=')[1]);
  }, [props.history.location.search]);

  useEffect(() => {
    if (!selsectProjectId) return;
    // console.log('home-selsectProjectId: ', selsectProjectId);
    getProjectData();
    getCategoryListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selsectProjectId]);

  const getProjectData = () => {
    request('get', '/project/detail/' + selsectProjectId).then((res: any) => {
      setProjectData(res.data);
      formData.setFieldsValue({ projectName: res.data.projectName, desc: res.data.desc });
    });
  };

  const getCategoryListData = () => {
    request('get', '/category/' + selsectProjectId).then((res: any) => {
      setCategoryListData(res.data);
    });
  };

  const changeProjectData = () => {
    const params = formData.getFieldsValue();
    request('put', '/project/' + selsectProjectId, params).then(() => {
      message.success('修改成功');
      getProjectData();
    });
  };

  const formDom = useMemo(() => {
    return (
      <Form form={formData}>
        <Form.Item name="projectName" label="项目名称">
          <Input placeholder="请输入" maxLength={50} />
        </Form.Item>
        <Form.Item name="desc" label="项目描述">
          <TextArea placeholder="请输入" autoSize={true} />
        </Form.Item>
      </Form>
    );
  }, [formData]);

  const listDom = useMemo(() => {
    const columns = [
      {
        title: '模块名',
        dataIndex: 'categoryName'
      },
      {
        title: '描述',
        dataIndex: 'desc'
      },
      {
        title: '操作',
        render: (obj: categoryListDataItem) => (
          <div className="button-box">
            <Button className="detail" type="primary" onClick={() => jumpCategoryDetail(obj)}>
              查看
            </Button>
            <Popconfirm title="确定要删除?" onConfirm={() => handleDel(obj)} okText="删除" cancelText="取消">
              <Button className="del" type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    ];

    const handleDel = (obj: categoryListDataItem) => {
      request('delete', '/category/' + obj._id).then(() => {
        message.success('操作成功');
        getCategoryListData();
      });
    };

    const jumpCategoryDetail = (obj: categoryListDataItem) => {
      props.history.push({ pathname: EnumProjectRoute.category, search: `id=${obj._id}` });
    };

    return <Table rowKey={(item: categoryListDataItem) => item._id} dataSource={categoryListData} columns={columns} pagination={false} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryListData]);

  return projectData?._id ? (
    <div className="home-page">
      <BreadcrumbBox data={[{ name: projectData.projectName }]} />
      <div className="project-detail">
        {formDom}
        <Button onClick={changeProjectData}>修改</Button>
      </div>
      <div className="category-list">{listDom}</div>
    </div>
  ) : (
    <EmptyBox />
  );
};

export default withRouter(Home);
