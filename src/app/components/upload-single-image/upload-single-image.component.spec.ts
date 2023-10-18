import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSingleImageComponent } from './upload-single-image.component';

describe('UploadSingleImageComponent', () => {
  let component: UploadSingleImageComponent;
  let fixture: ComponentFixture<UploadSingleImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadSingleImageComponent]
    });
    fixture = TestBed.createComponent(UploadSingleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
