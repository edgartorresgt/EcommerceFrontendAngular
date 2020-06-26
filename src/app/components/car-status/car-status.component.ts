import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/Cart.service';

@Component({
  selector: 'app-car-status',
  templateUrl: './car-status.component.html',
  styleUrls: ['./car-status.component.css']
})
export class CarStatusComponent implements OnInit {

  totalPrice = 0.00;
  totalQuantity = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateCartStatus();
  }

  updateCartStatus() {
     this.cartService.totalPrice.subscribe(
       data => this.totalPrice = data
     );

     this.cartService.totalQuantity.subscribe(
       data => this.totalQuantity = data
     );
  }

}
