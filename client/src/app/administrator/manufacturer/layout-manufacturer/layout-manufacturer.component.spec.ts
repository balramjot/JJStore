import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutManufacturerComponent } from './layout-manufacturer.component';

describe('LayoutManufacturerComponent', () => {
  let component: LayoutManufacturerComponent;
  let fixture: ComponentFixture<LayoutManufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutManufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
