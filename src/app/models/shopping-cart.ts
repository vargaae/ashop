import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  // we're going to use this field in our template to easily iterate over all the items in the shopping cart

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) 
      this.items.push(itemsMap[productId]);
  }

  // getQuantity(product: Product) {
  //   let item = this.itemsMap[product.key];
  //   return item ? item.quantity : 0;
  // }

  get productIds() {
    return Object.keys(this.items);
  }

  get totalItemsCount() {
    let count = 0;
  for (let productId in this.items)
    count += this.items[productId].quantity;
    return count;
  }


}
