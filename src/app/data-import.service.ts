import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Iroda, DatabaseCl } from './dataClasses';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class DataImportService {
  itemRef: AngularFireObject<any>;
  irodaRef: AngularFireObject<any>;

  item: Observable<any>;
  tableData: Array<any> = [];
  databaseObject: DatabaseCl = {};
 
  keys: Array<string> = [
    "irodaId",
    "city"
  ];

 
  currentData: any;

  constructor(
    private db: AngularFireDatabase
  ) {
  

    this.itemRef = db.object('Iroda');
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
