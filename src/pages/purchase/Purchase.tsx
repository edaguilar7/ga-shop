import { useLocation, Navigate, Link } from 'react-router-dom';
import { AppPaths } from 'config/paths';
import { Button } from 'components/button';
import { Result } from 'antd';

type PurchasePageState = {
  name: string;
  address: string;
};

const Purchase = () => {
  const location = useLocation();

  const pageState = location.state as PurchasePageState;

  if (!pageState) {
    return <Navigate to={AppPaths.products.path} replace />;
  }

  return (
    <Result
      status="success"
      title="Items Successfully Purchased!"
      subTitle={`${pageState.name} your order will be arriving soon.`}
      extra={[
        <Button type="primary">
          <Link to={AppPaths.products.path}>Go to home page</Link>
        </Button>,
      ]}
    />
  );
};

export default Purchase;
