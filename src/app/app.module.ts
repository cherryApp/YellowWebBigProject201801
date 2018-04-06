import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { NursesComponent } from './nurses/nurses.component';
import { PensionersComponent } from './pensioners/pensioners.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MedicinesService } from './medicines.service';
import { PensionersService } from './pensioners.service';
import { NursesService } from './nurses.service';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';


const routes: Routes = [
  { component: NursesComponent, path: 'nurses' },
  { component: PensionersComponent, path: 'pensioners' },
  { component: MedicinesComponent, path: 'medicines' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NursesComponent,
    PensionersComponent,
    MedicinesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    MedicinesService,
    PensionersService,
    NursesService,
    AngularFireAuth,
    AngularFireDatabase,
    AngularFirestore,
    AngularFirestoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
