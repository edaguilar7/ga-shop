/* eslint-disable no-underscore-dangle */
import { Product } from 'types/product';

const PERSISTED_ITEMS = 'PERSISTED_ITEMS';

export class LocalStorage {
  private static _items: Product[] = [];

  public static get items(): Product[] {
    const persitedItems = JSON.parse(localStorage.getItem(PERSISTED_ITEMS) ?? '[]');
    this._items = persitedItems;
    return this._items;
  }

  public static set items(items: Product[]) {
    this._items = items;
    localStorage.setItem(PERSISTED_ITEMS, JSON.stringify(items));
  }
}
