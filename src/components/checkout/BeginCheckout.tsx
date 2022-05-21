import { Product } from 'types/product';
import { ColumnsType } from 'antd/lib/table';
import { Table } from 'antd';

type BeginCheckoutProps = {
  items: Product[];
};

export const BeginCheckout = ({ items }: BeginCheckoutProps) => {
  const columns: ColumnsType<Product> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      render: (value) => `$${value}`,
    },
  ];

  return <Table dataSource={items} columns={columns} pagination={false} rowKey="id" />;
};
