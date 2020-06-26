import { Component, OnInit } from '@angular/core';
import { CarItem } from 'src/app/common/car-item';
import { CartService } from 'src/app/services/Cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  carItems: CarItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.listCartDetails();
  }

  listCartDetails() {
    this.carItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CarItem){
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CarItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CarItem){
    this.cartService.remove(theCartItem);
  }

}
