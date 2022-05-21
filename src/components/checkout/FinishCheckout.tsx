import { Button } from 'components/button';

type FinishCheckoutProps = {
  paymentMethod: string | null;
  shippingTier: string | null;
  finishCheckout: () => void;
};

export const FinishCheckout = ({
  paymentMethod,
  shippingTier,
  finishCheckout,
}: FinishCheckoutProps) => (
  <>
    <p className="checkout-finish-info">
      <b>Payment method:</b> {paymentMethod}
    </p>
    <p className="checkout-finish-info">
      <b>Shipping tier:</b> {shippingTier}
    </p>
    <Button onClick={finishCheckout}>Finish purchase</Button>
  </>
);
