import { Button as AntdButton, ButtonProps } from 'antd';
import './Button.css';

export const Button = (props: Omit<ButtonProps, 'className'>) => (
  <AntdButton {...props} className="app-button" />
);
