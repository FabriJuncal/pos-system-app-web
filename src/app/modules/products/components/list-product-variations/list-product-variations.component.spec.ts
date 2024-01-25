import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductVariationsComponent } from './list-product-variations.component';

describe('ListProductVariationsComponent', () => {
  let component: ListProductVariationsComponent;
  let fixture: ComponentFixture<ListProductVariationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductVariationsComponent]
    });
    fixture = TestBed.createComponent(ListProductVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
