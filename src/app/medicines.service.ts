import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class MedicinesService {
  Medicines: AngularFireList<any[]>;
  constructor(private database: AngularFireDatabase) { 
    this.Medicines = database.list('Medicines')};
    getMedicines(){
      return this.Medicines;
    }
}

