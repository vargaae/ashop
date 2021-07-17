import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  // product: Product;
  // quantity?: number;
  items: ShoppingCartItem[] = [];
  // we're going to use this field in our template to easily iterate over all the items in the shopping cart

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) {
      let item = this.itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  // this method was in product-card -> modified items->itemsMap
  // getQuantity() {
  //   if (!this.shoppingCart) { return 0; }
  //   else {
  //     let item = this.shoppingCart.items[this.product.key];

  //   return item ? item.quantity : 0;
  //   }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
   }

  // JavaScript code for getting array of keys from an Object:
  // get productIds() {
  //   return Object.keys(this.items);
  // }

  get totalItemsCount() {
    let count = 0;
  for (let productId in this.items)
    count += this.items[productId].quantity;
    return count;
  }


}
