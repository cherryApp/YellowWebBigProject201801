import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Iroda, DatabaseCl } from './dataClasses';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class DataImportService {
  itemRef: AngularFireObject<any>;

  tableData: Array<any> = [];

  keysOffice: Array<string> = [
    "irodaId",
    "city"];

  keysLandLord: Array<string> = [
    "landlordId", "name", "realEstateId", "phone"];

    

  constructor(
    private db: AngularFireDatabase,
  ) {

    this.itemRef = db.object('landlord');
    this.itemRef.valueChanges().subscribe(
      values => {
        this.tableData = [];
        for (var k in values) {
          this.tableData.push({
            key: k,
            data: values[k]
          });
        }
      }
    )

  }


  ngOnInit() {
  }

}
