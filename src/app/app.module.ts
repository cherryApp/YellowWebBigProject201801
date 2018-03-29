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
import { TripsComponent } from './trips/trips.component';
import { CarsComponent } from './cars/cars.component';
import { PstationsComponent } from './pstations/pstations.component';
import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  { component: TripsComponent, path: 'trips' },
  { component: CarsComponent, path: 'cars' },
  { component: PstationsComponent, path: 'pstations' },
  { component: PeopleComponent, path: 'people' }];
@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TripsComponent,
    CarsComponent,
    PstationsComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
