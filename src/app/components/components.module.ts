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



@NgModule({
  declarations: [
    LoaderComponent,
    UploadSingleImageComponent,
    TabComponent,
    TabGroupComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    SharedModule,
    TagifyModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    UploadSingleImageComponent,
    TabComponent,
    TabGroupComponent,
    TagComponent
  ]
})
export class ComponentsModule { }
