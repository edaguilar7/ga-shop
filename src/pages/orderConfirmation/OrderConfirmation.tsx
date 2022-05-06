import { AppPaths } from 'config/paths';
import { useContext, useCallback } from 'react';
import { CartContext } from 'context';
import { Product } from 'types/product';
import { ColumnsType } from 'antd/lib/table';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Form, Input, Result } from 'antd';
import { Button } from 'components/button';
import { GAEvents } from 'utils/GAEvents';
import './OrderConfirmation.css';

type FormData = {
  name: string;
  adress: string;
};

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { items, clear } = useContext(CartContext);

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

  const total = items.reduce((prev, current) => prev + current.price, 0);

  const handleFormSubmission = useCallback(
    (values: FormData) => {
      clear();
      GAEvents.purchase(items);
      navigate(AppPaths.purchase.path, {
        state: values,
      });
    },
    [items]
  );

  if (!items.length) {
    return (
      <Result
        title="No items in the cart"
        extra={
          <Button style={{ margin: '2rem auto 0' }}>
            <Link to={AppPaths.products.path}>Go to products</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="order-confirmation">
      <Table dataSource={items} columns={columns} pagination={false} />
      <p className="order-confirmation-total">
        Total: &nbsp;&nbsp;
        <b>${total}</b>
      </p>
      <Form
        name="confirmation"
        className="order-confirmation-form"
        form={form}
        layout="vertical"
        onFinish={handleFormSubmission}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" maxLength={50} />
        </Form.Item>
        <Form.Item
          label="Adress"
          name="adress"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input placeholder="Adress" maxLength={75} />
        </Form.Item>
        <Form.Item style={{ display: 'inline-block' }}>
          <Button type="primary" htmlType="submit" className="order-confirmation-submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginLeft: '1em' }}>
          <Button
            htmlType="reset"
            style={{ backgroundColor: '#FFF', color: '#001529', borderColor: '#001529' }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderConfirmation;
