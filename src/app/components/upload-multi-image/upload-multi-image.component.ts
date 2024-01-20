import { Component, Input } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UploadMultiImage } from './upload-multi-image';

@Component({
  selector: 'app-upload-multi-image',
  templateUrl: './upload-multi-image.component.html',
  styleUrls: ['./upload-multi-image.component.scss']
})
export class UploadMultiImageComponent {
  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @Input() options: UploadMultiImage;

  constructor() {}

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }
}
