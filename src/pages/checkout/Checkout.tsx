/* eslint-disable no-undef */
import { AppPaths } from 'config/paths';
import { useContext, useState, useCallback, useMemo } from 'react';
import { CartContext } from 'context';
import { useNavigate, Link } from 'react-router-dom';
import { Steps, Result } from 'antd';
import { Button } from 'components/button';
import { GAEvents } from 'utils/GAEvents';
import { BeginCheckout, FinishCheckout, PaymentInfo, ShippingInfo } from 'components/checkout';
import './Checkout.css';

const { Step } = Steps;

type CheckoutInfo = {
  paymentMethod: string | null;
  shippingTier: string | null;
};

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    paymentMethod: null,
    shippingTier: null,
  });
  const { items, clear } = useContext(CartContext);

  const purchase = useCallback(() => {
    clear();
    GAEvents.purchase(items);
    navigate(AppPaths.purchase.path, {
      state: {
        from: AppPaths.checkout.path,
      },
    });
  }, [items]);

  const total = useMemo(() => items.reduce((prev, current) => prev + current.price, 0), [items]);

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

  const steps = (
    <>
      <Step title="Items" />
      <Step title="Payment Info" />
      <Step title="Shipping Info" disabled={!checkoutInfo.paymentMethod} />
      <Step title="Finish" disabled={!(checkoutInfo.paymentMethod && checkoutInfo.shippingTier)} />
    </>
  );

  const stepsProps: any = {
    current: currentStep,
    onChange: setCurrentStep,
    children: steps,
  };

  const handleInfoChange = (key: keyof CheckoutInfo, value: string) => {
    if (key === 'paymentMethod') GAEvents.addPaymentInfo(items, value);

    if (key === 'shippingTier') GAEvents.addShippingInfo(items, value);

    setCheckoutInfo((prev) => ({ ...prev, [key]: value }));
  };

  const renderChild = () => {
    switch (currentStep) {
      case 0:
        return <BeginCheckout items={items} />;
      case 1:
        return (
          <PaymentInfo
            onChange={(value) => handleInfoChange('paymentMethod', value)}
            paymentMethod={checkoutInfo.paymentMethod}
          />
        );
      case 2:
        return (
          <ShippingInfo
            onChange={(value) => handleInfoChange('shippingTier', value)}
            shippingTier={checkoutInfo.shippingTier}
          />
        );
      case 3:
        return <FinishCheckout {...checkoutInfo} finishCheckout={purchase} />;
      default:
        return null;
    }
  };

  return (
    <div className="checkout">
      <Steps {...stepsProps} />
      <p className="checkout-total">
        Total: &nbsp;&nbsp;
        <b>${total.toFixed(2)}</b>
      </p>
      {renderChild()}
    </div>
  );
};

export default Checkout;
