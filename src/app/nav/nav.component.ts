import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  showDropdown: boolean = false;
  menuList: Array<{ label: string, url: string }> = [
    { label: 'Nurses', url: '/nurses' },
    { label: 'Pensioners', url: '/pensioners' },
    { label: 'Medicines', url: '/medicines' },
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  disableClick(event: MouseEvent) {
    event.preventDefault();
  }
}
