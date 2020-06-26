import { Injectable } from '@angular/core';
import { CarItem } from '../common/car-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CarItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCarItem: CarItem){
    let alreadyExistsInCart = false;
    let existingCartItem: CarItem;

    if (this.cartItems.length > 0){
      existingCartItem = this.cartItems.find( tempCarItem => tempCarItem.id === theCarItem.id);
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart){
      existingCartItem.quantity++;
    }

    else{
      this.cartItems.push(theCarItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (const currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  decrementQuantity(theCartItem: CarItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0){
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CarItem) {
     const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);
     if (itemIndex > -1){
       this.cartItems.splice(itemIndex, 1);
       this.computeCartTotals();
     }
  }

}
