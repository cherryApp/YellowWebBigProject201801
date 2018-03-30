import { Component, OnInit } from '@angular/core';
import { MedicinesService } from './medicines.service';
import { PensionersService } from './pensioners.service';
import { NursesService } from './nurses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private mService: MedicinesService,
    private pService: PensionersService,
    private nService: NursesService,
  ) {

  }
  ngOnInit() {

  }
  title = 'app';
}
