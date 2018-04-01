import { Component, OnInit } from '@angular/core';
import { DataImportService } from '../data-import.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  data: any;
  newRow: any = {};
  keys: Array<string> = [
    "landlordId",
    "name",
    "phone",
    "realEstateId"
  ];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;

  constructor(
    private importData: DataImportService,
    private db: AngularFireDatabase
  ) {
    this.data = this.importData.landlordData;
    console.log(this.data);
  }

  ngOnInit() {
  }

  dataAdd(record: any) {
    this.db.list('landlord').push(record).then(
      r => this.newRow = {}
    );
  }

  dataUpdate(row): void {
    // Rámutatok a távoli adatbázisban az adott kulcsú sorra.
    // Erre hívom meg az update metódust, aminek átadom az új adatokat.
    this.db.object('landlord/' + row.key).update(row.data);
  }

  dataDelete(key: string): void {
    this.db.object('landlord/' + key).remove();
  }
  
  sort(key): void {
    for (var k in this.sorts) {
      this.sorts[k] = "";
    }
    if (this.lastKey == key) {
      this.order *= -1;
    } else {
      this.order = 1;
    }
    this.sorts[key] = this.order == -1 ? 'up' : 'down';

    this.lastKey = key;
    this.data.sort((a, b) => {
      return a.data[key].toString().localeCompare(b.data[key].toString()) * this.order;
    });
  }
}
