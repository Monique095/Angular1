import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from './product';


@Component({
  templateUrl: './product.detail.component.html'

})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Checkout Page';
  errorMessage = '';
  product: Product | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void 
  {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void 
  {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void 
  {
    this.router.navigate(['/products']);
  }

  checkout(): void
  {
    alert('You have Checked out Successfully!');
    this.router.navigate(['/products']);
  }


}
