import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultiImageComponent } from './upload-multi-image.component';

describe('UploadMultiImageComponent', () => {
  let component: UploadMultiImageComponent;
  let fixture: ComponentFixture<UploadMultiImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadMultiImageComponent]
    });
    fixture = TestBed.createComponent(UploadMultiImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
