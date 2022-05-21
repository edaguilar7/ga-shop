import GTMModule from 'react-gtm-module';
import { Product } from 'types/product';
import { nanoid } from 'nanoid';
import { GACheckout } from './GACheckout';

export class GAEvents extends GACheckout {
  private static extractItemsProps = (items: Product[]) =>
    items.map(({ id, title, price }) => ({
      item_id: id,
      item_name: title,
      price,
    }));

  private static clearDataLayer = () => {
    GTMModule.dataLayer({
      dataLayer: {
        items: undefined,
      },
    });
  };

  /**
   * a user sees a list of items/offerings
   * @param products
   */
  static viewItemList(products: Product[]) {
    this.clearDataLayer();
    const items = this.extractItemsProps(products);

    GTMModule.dataLayer({
      dataLayer: {
        event: 'view_item_list',
        item_list_name: 'All products',
        item_list_id: -1,
        items: items.map((item, index) => ({
          ...item,
          item_list_name: 'All products',
          item_list_id: 'all_products',
          index,
        })),
      },
    });
  }

  /**
   * a user views an item
   * @param product
   */
  static viewItem(product: Product) {
    this.clearDataLayer();

    GTMModule.dataLayer({
      dataLayer: {
        event: 'view_item',
        currency: 'USD',
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            price: product.price.toFixed(2),
          },
        ],
        value: 0,
      },
    });
  }

  /**
   * a user views their cart
   */
  static viewCart() {
    GTMModule.dataLayer({
      dataLayer: {
        event: 'view_cart',
      },
    });
  }

  /**
   * a user adds items to cart
   * @param product
   */
  static addToCart(product: Product) {
    this.clearDataLayer();

    GTMModule.dataLayer({
      dataLayer: {
        event: 'add_to_cart',
        currency: 'USD',
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            price: product.price.toFixed(2),
          },
        ],
        value: 0,
      },
    });
  }

  /**
   * a user removes items from a cart
   * @param product
   */
  static removeFromCart(product: Product) {
    this.clearDataLayer();

    GTMModule.dataLayer({
      dataLayer: {
        event: 'remove_from_cart',
        currency: 'USD',
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            price: product.price.toFixed(2),
          },
        ],
        value: 0,
      },
    });
  }

  /**
   * a user begins checkout
   * @param itemsToBuy
   */
  static beginCheckout(itemsToBuy: Product[]) {
    this.resetCheckoutInfo();
    this.clearDataLayer();
    const items = this.extractItemsProps(itemsToBuy);

    GTMModule.dataLayer({
      dataLayer: {
        event: 'begin_checkout',
        currency: 'USD',
        items,
        value: 0,
      },
    });
  }

  /**
   * a user completes a purchase
   * @param itemsToBuy
   */
  static purchase(itemsToBuy: Product[]) {
    this.clearDataLayer();
    const items = this.extractItemsProps(itemsToBuy);
    const SHIPPING = 1.0;
    const value = items.reduce((prev, current) => prev + current.price, SHIPPING);

    GTMModule.dataLayer({
      dataLayer: {
        event: 'purchase',
        currency: 'USD',
        shipping: SHIPPING,
        tax: 0,
        transaction_id: nanoid(6),
        value,
        items,
      },
    });
  }

  /**
   * a user submits their payment information
   * @param itemsToBuy
   * @param paymentMethod
   * @returns
   */
  static addPaymentInfo(itemsToBuy: Product[], paymentMethod: string) {
    if (this.currentPaymentMethod === paymentMethod) return;

    this.clearDataLayer();
    const items = this.extractItemsProps(itemsToBuy);
    this.currentPaymentMethod = paymentMethod;

    GTMModule.dataLayer({
      dataLayer: {
        event: 'add_payment_info',
        currency: 'USD',
        items,
        value: 0,
        payment_type: paymentMethod,
      },
    });
  }

  /**
   * a user submits their shipping information
   * @param itemsToBuy
   * @param paymentMethod
   * @returns
   */
  static addShippingInfo(itemsToBuy: Product[], shippingTier: string) {
    if (this.currentShippingTier === shippingTier) return;

    this.clearDataLayer();
    const items = this.extractItemsProps(itemsToBuy);
    this.currentShippingTier = shippingTier;

    GTMModule.dataLayer({
      dataLayer: {
        event: 'add_shipping_info',
        currency: 'USD',
        items,
        value: 0,
        shipping_tier: shippingTier,
      },
    });
  }
}
