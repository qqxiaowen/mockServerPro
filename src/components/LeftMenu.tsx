/*
 * @Author: xiaoWen
 * @Date: 2021-11-30 18:21:09
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-02 09:54:12
 */
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { Dispatch, SetStateAction } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { EnumProjectRoute } from '../utils/tsMap';

const { SubMenu } = Menu;

export interface MenuDataItem {
  desc: string;
  projectName: string;
  _id: string;
  [key: string]: string;
}

interface LeftMenuProps extends RouteComponentProps {
  menuData: MenuDataItem[];
  setSelsectProjectId: Dispatch<SetStateAction<string>>;
}

const LeftMenu = (props: LeftMenuProps) => {
  const { menuData, setSelsectProjectId } = props;

  const onClick = (e: any) => {
    // console.log('onSelect');
    setSelsectProjectId(e.key);
    // console.log(props.history.location.pathname);
    if (props.history.location.pathname !== EnumProjectRoute.home) {
      props.history.push(EnumProjectRoute.home);
    }
  };

  return (
    <Menu onClick={onClick} style={{ width: 256 }} defaultOpenKeys={['project']} mode="inline">
      <SubMenu key="project" icon={<AppstoreOutlined />} title="项目列表">
        {menuData.map((item: MenuDataItem) => (
          <Menu.Item key={item._id}>{item.projectName}</Menu.Item>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default withRouter(LeftMenu);
