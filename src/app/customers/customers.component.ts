import { Component, OnInit } from '@angular/core';
import { DataImportService } from '../data-import.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
data: any
  constructor(private importData: DataImportService) { 
    this.data = this.importData.landlordData;
  }

  ngOnInit() {
  }

}
