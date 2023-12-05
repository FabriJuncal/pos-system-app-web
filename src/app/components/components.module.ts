import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image.component';
import { SharedModule } from '../_metronic/shared/shared.module';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';



@NgModule({
  declarations: [
    LoaderComponent,
    UploadSingleImageComponent,
    TabComponent,
    TabGroupComponent,
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    SharedModule
  ],
  exports: [
    LoaderComponent,
    UploadSingleImageComponent,
    TabComponent,
    TabGroupComponent
  ]
})
export class ComponentsModule { }
