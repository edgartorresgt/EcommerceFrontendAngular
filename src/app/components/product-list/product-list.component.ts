import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryMenuComponent } from '../product-category-menu/product-category-menu.component';
import { CarItem } from 'src/app/common/car-item';
import { CartService } from 'src/app/services/Cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute, private theCartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }

  }
  handleSearchProducts() {
     const theKeyWord: string = this.route.snapshot.paramMap.get('keyword');
     this.productService.searchProducts(theKeyWord).subscribe(
       data =>{
         this.products = data;
       }

     );
  }

  handleListProducts(){
      // check id parameter is available
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

      if(hasCategoryId){
        // get the id param string value
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      }
      else {
        this.currentCategoryId = 1;
      }
      this.productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data;
        }
      );
  }

  addToCart(theProduct: Product){
    const theCartImem = new CarItem(theProduct);
    this.theCartService.addToCart(theCartImem);
  }

}
