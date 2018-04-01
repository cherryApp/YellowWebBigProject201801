import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { DriversComponent } from './drivers/drivers.component';
import { FuelingComponent } from './fueling/fueling.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { component: UsersComponent, path: 'users' },
  { component: VehiclesComponent, path: 'vehicles' },
  { component: DriversComponent, path: 'drivers' },
  { component: FuelingComponent, path: 'fueling' }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    UsersComponent,
    VehiclesComponent,
    DriversComponent,
    FuelingComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
