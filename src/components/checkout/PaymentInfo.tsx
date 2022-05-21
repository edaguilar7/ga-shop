import { Radio } from 'antd';

type PaymentInfoProps = {
  paymentMethod: string | null;
  onChange: (paymentMethod: string) => void;
};

export const PaymentInfo = ({ onChange, paymentMethod }: PaymentInfoProps) => (
  <>
    <h2 className="checkout-info-title">Add your favorite payment method</h2>
    <Radio.Group onChange={(evt) => onChange(evt.target.value)} value={paymentMethod}>
      <Radio value="credit-card">Credit card</Radio>
      <Radio value="cash">Cash</Radio>
    </Radio.Group>
  </>
);
