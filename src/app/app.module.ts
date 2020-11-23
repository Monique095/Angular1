import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './users/user-registration/user.registration.component';
import { UserLoginComponent } from './users/user-login/user.login.component';
import { ProductListComponent } from './product-lists/product.list.component';
import { AddProductComponent } from './add-products/add.product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserServiceService } from './services/user-service.service';
import { AuthService } from './services/auth.service';
import { ProductData } from './in-memory-web-api/in.memory.web.api';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    AddProductComponent,
    ProductListComponent

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
      { path: 'add-products', component:  AddProductComponent},
      { path: 'product-lists' , component: ProductListComponent},
      { path: '', redirectTo: 'product-lists', pathMatch: 'full'},
      { path: '**', redirectTo: 'product-lists', pathMatch: 'full'}
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
