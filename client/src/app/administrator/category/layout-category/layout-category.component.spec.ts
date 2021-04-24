import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCategoryComponent } from './layout-category.component';

describe('LayoutCategoryComponent', () => {
  let component: LayoutCategoryComponent;
  let fixture: ComponentFixture<LayoutCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
