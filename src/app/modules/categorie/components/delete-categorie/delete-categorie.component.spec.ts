import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategorieComponent } from './delete-categorie.component';

describe('DeleteCategorieComponent', () => {
  let component: DeleteCategorieComponent;
  let fixture: ComponentFixture<DeleteCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCategorieComponent]
    });
    fixture = TestBed.createComponent(DeleteCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
