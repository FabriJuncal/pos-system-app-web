import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image.component';
import { SharedModule } from '../_metronic/shared/shared.module';



@NgModule({
  declarations: [
    LoaderComponent,
    UploadSingleImageComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    SharedModule
  ],
  exports: [
    LoaderComponent,
    UploadSingleImageComponent
  ]
})
export class ComponentsModule { }
