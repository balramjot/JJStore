import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelproductComponent } from './cancelproduct.component';

describe('CancelproductComponent', () => {
  let component: CancelproductComponent;
  let fixture: ComponentFixture<CancelproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
