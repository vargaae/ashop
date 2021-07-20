import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  product: Product;
  // quantity?: number;
  items: ShoppingCartItem[] = [];
  // we're going to use this field in our template to easily iterate over all the items in the shopping cart

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (let productId in itemsMap) {
      let item = this.itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, key: productId }));
        // when we apply the spread operator to an object TypeScript will iterate over all the properties of this object and add them here (in ...item); so the three lines commented above are exactly the same as the ...item line

      // let x = new ShoppingCartItem({
        // title: item.title,
        // imageUrl: item.imageUrl,
        // price: item.price,
      //   ...item,
      //   key: productId
      // });
      // this.items.push(x);
    }
  }

  getQuantity(product: Product) {
    // console.log("product", product);
    let item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }

  getShoppingCartItemQuantity(product: Product) {
    // console.log("product", product);
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
