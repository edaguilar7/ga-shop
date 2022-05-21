import { Radio } from 'antd';

type ShippingInfoProps = {
  shippingTier: string | null;
  onChange: (paymentMethod: string) => void;
};

export const ShippingInfo = ({ onChange, shippingTier }: ShippingInfoProps) => (
  <>
    <h2 className="checkout-info-title">Add your favorite shipping tier</h2>
    <Radio.Group onChange={(evt) => onChange(evt.target.value)} value={shippingTier}>
      <Radio value="ground">Ground</Radio>
      <Radio value="air">Air</Radio>
    </Radio.Group>
  </>
);
