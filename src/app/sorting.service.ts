import { Injectable } from '@angular/core';

@Injectable()
export class SortingService {
  lastKey: string = "";
  order: number = 1;

  public sortIt(key: string, tableData: Array<any>, sorts) {
    for (var k in sorts) {
      sorts[k] = "";
    }
    if (this.lastKey == key) {
      this.order *= -1;
    } else {
      this.order = 1;
    }
    sorts[key] = this.order == -1 ? 'up' : 'down';

    this.lastKey = key;
    tableData = tableData.sort((a, b) => {
      return Number.parseFloat(a.data[key]) ? (a.data[key] - b.data[key]) * this.order : (a.data[key].toString().localeCompare(b.data[key].toString()) * this.order);
    });
    console.log(`Sorting table for column ${key} completed. State: ${sorts[key]}`);
  }

  constructor() {
  }

}
