import { Menu, Spin } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AppPaths } from 'config/paths';
import { shouldLoadData } from 'utils/state';
import { StockContext } from 'context';

export const HeaderMenu = () => {
  const { pathname } = useLocation();
  const { categories, loadCategories } = useContext(StockContext);

  useEffect(() => {
    if (shouldLoadData(categories)) {
      loadCategories();
    }
  }, [categories]);

  if (categories.isLoading) return <Spin spinning />;

  return (
    <Menu activeKey={pathname} mode="horizontal" theme="dark">
      {categories.data.map((category) => (
        <Menu.Item key={category}>
          <Link to={AppPaths.category.path(category)}>{category}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};
