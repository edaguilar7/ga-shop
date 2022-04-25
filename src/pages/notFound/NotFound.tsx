import { Link } from 'react-router-dom';
import { Result } from 'antd';

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to="/" className="ant-btn ant-btn-primary">
        Go back
      </Link>
    }
  />
);

export default NotFound;
