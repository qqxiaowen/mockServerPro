/*
 * @Author: xiaoWen
 * @Date: 2021-11-30 18:21:09
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-03 11:30:59
 */
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
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
}

const LeftMenu = (props: LeftMenuProps) => {
  const { menuData } = props;

  const onClick = (e: any) => {
    // if (props.history.location.pathname === EnumProjectRoute.home) {
      props.history.push({ pathname: EnumProjectRoute.home, search: `id=${e.key}` });
    // }
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
