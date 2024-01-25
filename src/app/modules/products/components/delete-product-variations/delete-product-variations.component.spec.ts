import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductVariationsComponent } from './delete-product-variations.component';

describe('DeleteProductVariationsComponent', () => {
  let component: DeleteProductVariationsComponent;
  let fixture: ComponentFixture<DeleteProductVariationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteProductVariationsComponent]
    });
    fixture = TestBed.createComponent(DeleteProductVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
