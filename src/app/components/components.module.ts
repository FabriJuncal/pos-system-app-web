import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image.component';



@NgModule({
  declarations: [
    LoaderComponent,
    UploadSingleImageComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [
    LoaderComponent,
    UploadSingleImageComponent
  ]
})
export class ComponentsModule { }
