import { Component, Input, ChangeDetectorRef  } from '@angular/core';
import { UploadSingleImage } from './upload-single-image';
import { ImageService } from '../../services/image.service';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/interfaces/image';



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
    imageName: string;

  constructor(
    private imageService: ImageService,
    private cdr: ChangeDetectorRef
    ) {
    this.cambiarImagenDeFondo();
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) {
      console.error('Error: no se pudo cargar la imagen');
      return;
    }

    const image: File =  inputElement.files[0];
    const imageSelected: Image = {
      name: null,
      path: 'logo',
      file: image
    }
    this.uploadImage(imageSelected);
  }

  uploadImage(image: Image) {
    this.imageService.uploadImage(image).subscribe((response: any) => {
      console.log('Imagen subida exitosamente:', response);
      this.imageName = response.image;
      this.imageUrl = environment.logosUrl + this.imageName;
      console.log('this.imageUrl->', this.imageUrl);
      // Notifica a Angular para que actualice la vista
      this.cdr.detectChanges();
    });
  }

  deleteImage(){
    const image: Image = {
      name: this.imageName,
      path: this.imageUrl,
      file: null
    }
    this.imageService.deleteImage(image).subscribe((response: any) => {
      console.log('Imagen eliminada exitosamente:', response);
      this.cambiarImagenDeFondo();
      // Notifica a Angular para que actualice la vista
      this.cdr.detectChanges();
    });
  }

  // Cambia el icono de "sin logo" según el tema elegido.
  cambiarImagenDeFondo() {
    const theme = localStorage.getItem('data-bs-theme');
    this.imageUrl = 'assets/media/svg/files/';
    this.imageUrl = theme === 'light' ? this.imageUrl + 'blank-image.svg' :  this.imageUrl + 'blank-image-dark.svg';
  }
}
