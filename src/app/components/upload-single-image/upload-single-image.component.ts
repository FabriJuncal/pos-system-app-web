import { Component, Input } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { UploadSingleImage } from './upload-single-image';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-upload-single-image',
  templateUrl: './upload-single-image.component.html',
  styleUrls: ['./upload-single-image.component.scss']
})
export class UploadSingleImageComponent {
  @Input() options: UploadSingleImage;
    percentDone: number;
    uploadSuccess: boolean;
    imageUrl: string;
    imagen: any;

  constructor(private http: HttpClient) {
    this.cambiarImagenDeFondo();
  }

  uploadImage(event: Event) {

    if (!event.target) {
      console.error('Error: no se pudo cargar la imagen');
      return;
    }

    const inputElement = event.target as HTMLInputElement;
    const files: File[] =  Array.from(inputElement.files ?? []) as File[];
    this.basicUploadImage(files);
  }

  basicUploadImage(files: File[]) {
    console.log(files);
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append('file', f));
    this.http.post('https://file.io', formData).subscribe((event: any) => {
      console.log('done');
      this.imageUrl = event.urlImagen;
    });
  }


  // uploadImageAndProgress(files: File[]) {
  //   console.log(files);
  //   const formData = new FormData();
  //   Array.from(files).forEach((f) => formData.append('file', f));

  //   this.http
  //     .post('https://file.io', formData, {
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .subscribe((event: any) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.percentDone = Math.round((100 * event.loaded) / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         this.uploadSuccess = true;
  //       }
  //     });
  // }

  // Cambia el icono de "sin logo" según el tema elegido.
  cambiarImagenDeFondo() {
    const theme = localStorage.getItem('data-bs-theme');
    this.imageUrl = 'assets/media/svg/files/';
    this.imageUrl = theme === 'light' ? this.imageUrl + 'blank-image.svg' :  this.imageUrl + 'blank-image-dark.svg';
  }
}
