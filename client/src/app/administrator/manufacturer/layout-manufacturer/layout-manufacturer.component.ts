import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-manufacturer',
  template: `
  <div class="wrapper">
  <app-sidebar></app-sidebar>
  <div class="main-panel">
    <app-header></app-header>
      <br/><br/><br/><br/>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  </div>
</div>
  `,
  styles: [
  ]
})
export class LayoutManufacturerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
