import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './users/user-registration/user.registration.component';
import { UserLoginComponent } from './users/user-login/user.login.component';
import { ProductListComponent } from './product-lists/product.list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserServiceService } from './services/user-service.service';
import { AuthService } from './services/auth.service';
import { ProductData } from './in-memory-web-api/in.memory.web.api';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductDetailComponent } from './product-lists/product.detail.component';
import { ProductEditComponent } from './product-lists/product.edit.component';
import { ProductEditCreateGuard } from './guard/create-edit.guard';
import { MyProductsComponent } from './product-lists/my-products.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    MyProductsComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      //Specify the Routes 
      { path: 'user-login', component: UserLoginComponent},
      { path: 'user-registration', component: UserRegistrationComponent},
      { path: 'products' , component: ProductListComponent},
      { path: 'my-products', component: MyProductsComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'products/:id/edit', component: ProductEditComponent, canDeactivate: [ProductEditCreateGuard] },
      { path: '', redirectTo: 'products', pathMatch: 'full'},
      { path: '**', redirectTo: 'products', pathMatch: 'full'}
  ]),
  InMemoryWebApiModule.forRoot(ProductData)

],

  providers: [
    UserServiceService,
    AuthService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
