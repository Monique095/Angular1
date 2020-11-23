import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './product.list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Browse Available Products';
  loggedInUser: string;
  errorMessage = '';

  //For the Images
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;


  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router) { }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Checks both the product name and tags
  performFilter2(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        (product.tags && product.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1)));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  //The Buy Button
  buyButton(){
    this.loggedInUser = localStorage.getItem('token');
    if(this.loggedInUser){
      // this.router.navigate(['/']);
      alert('Navigating to the Buy Page')
    }
    else{
      this.router.navigate(['/user-login']);
      alert('You must be logged in to Buy a Product!')
    }
  }
  

  goToLoginPage(): void{
    this.router.navigate(['/user-login']);
  }
}