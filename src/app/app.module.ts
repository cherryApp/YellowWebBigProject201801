import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { NavComponent } from './nav/nav.component';
import { OfficeComponent } from './office/office.component';
import { AgentsComponent } from './agents/agents.component';
import { EstatesComponent } from './estates/estates.component';
import { CustomersComponent } from './customers/customers.component';
import { DataImportService } from './data-import.service';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: '', component: OfficeComponent, pathMatch: 'full' },
  { component: OfficeComponent, path: 'offices', data: { page: 'offices' } },
  { component: AgentsComponent, path: 'agents', data: { page: 'agents' } },
  { component: EstatesComponent, path: 'estates', data: { page: 'estates' } },
  { component: CustomersComponent, path: 'customers', data: { page: 'customers' } },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CustomersComponent,
    EstatesComponent,
    AgentsComponent,
    OfficeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    DataImportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
