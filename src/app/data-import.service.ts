import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Office, DatabaseCl } from './dataClasses';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class DataImportService {
  officeRef: AngularFireObject<any>;
  officeData: Array<any> = [];

  agentRef: AngularFireObject<any>;
  agentData: Array<any> = [];

  landlordRef: AngularFireObject<any>;
  landlordData: Array<any> = [];

  estateRef: AngularFireObject<any>;
  estateData: Array<any> = [];



  constructor(
    private db: AngularFireDatabase
  ) {

    this.officeRef = db.object('office');
    this.officeRef.valueChanges().subscribe(
      values => {
        this.officeData = [];
        for (var k in values) {
          this.officeData.push({
            key: k,
            data: values[k]
          });
        }
      }
    )


    this.landlordRef = db.object('landlord');
    this.landlordRef.valueChanges().subscribe(
      values => {
        this.landlordData = [];
        for (var k in values) {
          this.landlordData.push({
            key: k,
            data: values[k]
          });
        }
      }
    )


    this.estateRef = db.object('realEstate');
    this.estateRef.valueChanges().subscribe(
      values => {
        this.estateData = [];
        for (var k in values) {
          this.estateData.push({
            key: k,
            data: values[k]
          });
        }
      }
    )



    this.agentRef = db.object('agent');
    this.agentRef.valueChanges().subscribe(
      values => {
        this.agentData = [];
        for (var k in values) {
          this.agentData.push({
            key: k,
            data: values[k]
          });
        }
      }
    )

  }

  /* not working! to be continued

  addLandLord(key: string, record: any) {
    this.db.list(key).push(record);
  }
  set addOffice(record: any) {
    this.db.list('office').push(record);
  }
  set addAgent(record: any) {
    this.db.list('agent').push(record);
  }
  set addEstate(record: any) {
    this.db.list('agent').push(record);
  }
*/
  ngOnInit() {
  }


}
