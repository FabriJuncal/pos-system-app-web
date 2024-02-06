import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image.component';
import { SharedModule } from '../_metronic/shared/shared.module';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TagComponent } from './tag/tag.component';
import { TagifyModule } from 'ngx-tagify';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMultiImageComponent } from './upload-multi-image/upload-multi-image.component';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { InfoMessageComponent } from './info-message/info-message.component';
import { ColoredCircleComponent } from './colored-circle/colored-circle.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };

@NgModule({
  declarations: [
    LoaderComponent,
    UploadSingleImageComponent,
    UploadMultiImageComponent,
    TabComponent,
    TabGroupComponent,
    TagComponent,
    InfoMessageComponent,
    ColoredCircleComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    SharedModule,
    TagifyModule,
    FormsModule,
    ReactiveFormsModule,
    DropzoneModule
  ],
  exports: [
    LoaderComponent,
    UploadSingleImageComponent,
    UploadMultiImageComponent,
    TabComponent,
    TabGroupComponent,
    TagComponent,
    InfoMessageComponent,
    ColoredCircleComponent
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ComponentsModule { }
