import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product } from './product';
import { GenericValidator } from '../shared/generic-validator';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './product.edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Advert Edit';
  errorMessage: string;
  productForm: FormGroup;

  product: Product;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;



  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {

    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
     
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      price: '',
      releaseDate: '',
      description: ''
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProduct(id);
      }
    );
  }

  ngOnDestroy(): void 
  {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void 
  {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       merge(this.productForm.valueChanges, ...controlBlurs).pipe(
       debounceTime(800)
       ).subscribe(value => {
       this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }


  getProduct(id: number): void 
  {
    this.productService.getProduct(id)
      .subscribe({
        next: (product: Product) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }

  displayProduct(product: Product): void
  {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add a new Advert';
    } else {
      this.pageTitle = `Edit Advert: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      description: this.product.description,
      price: this.product.price,
      releaseDate: this.product.releaseDate
    });
  }

  deleteProduct(): void 
  {
    if (this.product.id === 0) 
    {
      this.onSaveComplete();
    } 
    else 
    {
      if (confirm(`Really delete ${this.product.productName} Advert:?`)) 
      {
        this.productService.deleteProduct(this.product.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveProduct(): void 
  {
    if (this.productForm.valid) 
    {
      if (this.productForm.dirty) 
      {
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) 
        {
          this.productService.createProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } 
        else 
        {
          this.productService.updateProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } 
      else 
      {
        this.onSaveComplete();
      }
    } 
    else 
    {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void 
  {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/my-products']);
  }

 
}
