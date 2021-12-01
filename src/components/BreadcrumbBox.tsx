/*
 * @Author: xiaoWen
 * @Date: 2021-12-01 14:46:03
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-01 14:58:28
 */

import { Breadcrumb } from 'antd';

interface BreadcrumbBoxDataItem {
  name: string;
}

interface BreadcrumbBoxProps {
  data: BreadcrumbBoxDataItem[];
}

const BreadcrumbBox = (props: BreadcrumbBoxProps) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <Breadcrumb>
        {props.data.map((item: BreadcrumbBoxDataItem) => (
          <Breadcrumb.Item key={item.name}>{item.name}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbBox;
