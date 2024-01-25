import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductVariationsComponent } from './edit-product-variations.component';

describe('EditProductVariationsComponent', () => {
  let component: EditProductVariationsComponent;
  let fixture: ComponentFixture<EditProductVariationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductVariationsComponent]
    });
    fixture = TestBed.createComponent(EditProductVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
