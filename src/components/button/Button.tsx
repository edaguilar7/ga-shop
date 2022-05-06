import { Button as AntdButton, ButtonProps } from 'antd';
import classNames from 'classnames';
import './Button.css';

export const Button = ({ className, ...rest }: ButtonProps) => (
  <AntdButton {...rest} className={classNames('app-button', className)} />
);
