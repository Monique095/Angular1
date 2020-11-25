import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './product.list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Browse All Adverts';
  loggedInUser: string;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string 
  {
    return this._listFilter;
  }
  set listFilter(value: string) 
  {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router) { }

  performFilter(filterBy: string): Product[] 
  {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  ngOnInit(): void 
  {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  //The Buy Button
  buyButton()
  {
    // this.router.navigate(['/products/:id']);
    this.loggedInUser = localStorage.getItem('token');
    if(this.loggedInUser)
    {
      alert('Navigating to the Buy Page')
    }
    else
    {
      this.router.navigate(['/user-login']);
      alert('You must be logged in to Buy a Product!')
    }
  }
  
  goToLoginPage(): void
  {
    this.router.navigate(['/user-login']);
  }
}