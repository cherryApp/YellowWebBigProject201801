import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavComponent } from './nav/nav.component';

import { OfficesComponent } from './offices/offices.component';
import { AgentsComponent } from './agents/agents.component';
import { EstatesComponent } from './estates/estates.component';
import { CustomersComponent } from './customers/customers.component';

const appRoutes: Routes = [
  { path: '', component: OfficesComponent, pathMatch: 'full' },
  { component: OfficesComponent, path: 'offices' },
  { component: AgentsComponent, path: 'agents' },
  { component: EstatesComponent, path: 'estates' },
  { component: CustomersComponent, path: 'customers' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CustomersComponent,
    EstatesComponent,
    AgentsComponent,
    OfficesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
