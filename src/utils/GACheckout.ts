export class GACheckout {
  protected static currentPaymentMethod: null | string = null;

  protected static currentShippingTier: null | string = null;

  protected static resetCheckoutInfo() {
    this.currentPaymentMethod = null;
    this.currentShippingTier = null;
  }
}
