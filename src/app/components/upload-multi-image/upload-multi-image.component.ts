import { Component, Input } from '@angular/core';
import { UploadMultiImage } from './upload-multi-image';

@Component({
  selector: 'app-upload-multi-image',
  templateUrl: './upload-multi-image.component.html',
  styleUrls: ['./upload-multi-image.component.scss']
})
export class UploadMultiImageComponent {
  @Input() options: UploadMultiImage;
}
