import ReactGA4 from 'react-ga4';
import { Product } from 'types/product';
import { nanoid } from 'nanoid';

export class GAEvents {
  private static extractItemsProps = (items: Product[]) =>
    items.map(({ id, title, price }) => ({
      item_id: id,
      item_name: title,
      price,
    }));

  /**
   * a user sees a list of items/offerings
   * @param products
   */
  static viewItemList(products: Product[]) {
    const items = this.extractItemsProps(products);

    ReactGA4.event('view_item_list', {
      item_list_name: 'All products',
      item_list_id: -1,
      items,
    });
  }

  /**
   * a user views an item
   * @param product
   */
  static viewItem(product: Product) {
    ReactGA4.event('view_item', {
      currency: 'USD',
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          price: product.price.toFixed(2),
        },
      ],
      value: 0,
    });
  }

  /**
   * a user views their cart
   */
  static viewCart() {
    ReactGA4.event('view_cart');
  }

  /**
   * a user adds items to cart
   * @param product
   */
  static addToCart(product: Product) {
    ReactGA4.event('add_to_cart', {
      currency: 'USD',
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          price: product.price.toFixed(2),
        },
      ],
      value: product.price.toFixed(2),
    });
  }

  /**
   * a user removes items from a cart
   * @param product
   */
  static removeFromCart(product: Product) {
    ReactGA4.event('remove_from_cart', {
      currency: 'USD',
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          price: product.price.toFixed(2),
        },
      ],
      value: product.price.toFixed(2),
    });
  }

  /**
   * a user begins checkout
   * @param itemsToBuy
   */
  static beginCheckout(itemsToBuy: Product[]) {
    const items = this.extractItemsProps(itemsToBuy);

    ReactGA4.event('begin_checkout', {
      currency: 'USD',
      items,
      value: 0,
    });
  }

  /**
   * a user completes a purchase
   * @param itemsToBuy
   */
  static purchase(itemsToBuy: Product[]) {
    const items = this.extractItemsProps(itemsToBuy);
    const SHIPPING = 1.0;
    const value = items.reduce((prev, current) => prev + current.price, SHIPPING);

    ReactGA4.event('purchase', {
      currency: 'USD',
      shipping: SHIPPING,
      tax: 0,
      transaction_id: nanoid(6),
      value,
      items,
    });
  }
}
