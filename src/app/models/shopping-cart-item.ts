

  export class ShoppingCartItem {
    $key: string;
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

     constructor(init?: Partial<ShoppingCartItem>) {
       Object.assign(this, init);
       // with Object.assign() we're copying all the properties from init into the this current object (so this is the target, and our source is init)
     }
       // this means init can be an object that looks like the ShoppingCartItem, it can have one or more properties
       
    // constructor(public product: Product, public quantity: number) {}

    get totalPrice() { return this.price * this.quantity }
  }
