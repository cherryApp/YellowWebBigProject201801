import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { SortingService } from './sorting.service';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { Route } from '@angular/compiler/src/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { component: LoginComponent, path: 'login' },
  { component: ProductsComponent, path: 'products' },
  { component: CustomersComponent, path: 'customers' },
  { component: OrdersComponent, path: 'orders' }
];
@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    LoginComponent,
    ProductsComponent,
    NavBarComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    SortingService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
