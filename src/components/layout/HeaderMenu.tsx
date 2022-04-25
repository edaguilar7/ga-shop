import { Menu, Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
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
        <Menu.Item key={category}>{category}</Menu.Item>
      ))}
    </Menu>
  );
};
