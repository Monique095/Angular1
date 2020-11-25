import { HttpClient } from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product-lists/product';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './my-products.component.html'
})
export class MyProductsComponent implements OnInit {
  
    pageTitle = 'My Adverts';
    errorMessage = '';
    filteredProducts: Product[] = [];
    products: Product[] = [];

    constructor(private productService: ProductService, 
                public http: HttpClient,
                private router: Router,
                private authService: AuthService) { }
  

  ngOnInit(): void 
  {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: err => this.errorMessage = err
    });      
  }
   
  addAdvert() : void
  {
    this.router.navigate(['/products/0/edit']);
  }
}
