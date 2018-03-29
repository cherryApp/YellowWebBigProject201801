import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { NavComponent } from './nav/nav.component';
import { OfficeComponent } from './office/office.component';
import { AgentsComponent } from './agents/agents.component';
import { EstatesComponent } from './estates/estates.component';
import { CustomersComponent } from './customers/customers.component';
import { DataImportService } from './data-import.service';


const appRoutes: Routes = [
  { path: '', component: OfficeComponent, pathMatch: 'full' },
  { component: OfficeComponent, path: 'offices' },
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
    OfficeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    DataImportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
