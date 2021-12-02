/*
 * @Author: xiaoWen
 * @Date: 2021-12-01 14:46:03
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-02 18:30:33
 */

import { Breadcrumb } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface BreadcrumbBoxDataItem {
  name: string;
  url?: string;
}

interface BreadcrumbBoxProps extends RouteComponentProps {
  data: BreadcrumbBoxDataItem[];
}

const BreadcrumbBox = (props: BreadcrumbBoxProps) => {
  const jumpPage = (val: BreadcrumbBoxDataItem) => {
    if (val.url) {
      props.history.push(val.url);
    }
  };
  return (
    <div style={{ marginBottom: 24 }}>
      <Breadcrumb>
        {props.data.map((item: BreadcrumbBoxDataItem) => (
          <Breadcrumb.Item onClick={() => jumpPage(item)} key={item.name}>
            {item.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default withRouter(BreadcrumbBox);
