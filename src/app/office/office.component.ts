import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  tableData: Array<any> = [];
  keys: Array<string> = [
    "Iroda",
    "agent",
    "landlord",
    "address"
  ];

  constructor(private db: AngularFireDatabase) {
    this.itemRef = db.object('bigprojektData');
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
    );
    console.log(this.itemRef);
  }

  ngOnInit() { }

}
