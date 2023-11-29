import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { UploadSingleImage } from './upload-single-image';
import { ImageService } from '../../services/image.service';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/interfaces/image';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-upload-single-image',
  templateUrl: './upload-single-image.component.html',
  styleUrls: ['./upload-single-image.component.scss']
})
export class UploadSingleImageComponent implements OnInit {
  @Input() options: UploadSingleImage;
    percentDone: number;
    uploadSuccess: boolean;
    imageUrl: string;
    imageName: string;
    imageFile: File;
    imagePreview: string;

  constructor(
    private imageService: ImageService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
    ) {

  }

  ngOnInit(){
    this.cambiarImagenDeFondo();
  }

  onImageSelected(event: Event) {
    console.log('onImageSelected->',event);
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) {
      this.toastr.error('ERROR AL CARGAR LA IMAGEN, INTENTE NUEVAMENTE.');
      return;
    }

    if (inputElement.files[0].type.indexOf("image") < 0) {
      this.toastr.error('EL ARCHIVO CARGADO NO ES UNA IMAGEN');
      return;
    }

    const image: File =  inputElement.files[0];
    const imageSelected: Image = {
      name: null,
      path: this.options.pathImage,
      file: image
    }
    // this.uploadImage(imageSelected);
    this.readImageAsDataUrl(image)
      .then((result) => {
        this.imagePreview = result;
        console.log(this.imagePreview);
        // Notifica a Angular para que actualice la vista
        this.cdr.detectChanges();
      })
      .catch((error) => {
        console.error('Error al leer la imagen:', error);
      });
  }

  readImageAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        resolve(event.target.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }


  uploadImage(image: Image) {
    this.imageService.uploadImage(image).subscribe((response: any) => {
      console.log('Imagen subida exitosamente:', response);
      this.imageName = response.image;
      this.imageUrl = `${environment.urlImages}/${this.options.pathImage}/${this.imageName}`;
      console.log('this.imageUrl->', this.imageUrl);
      // Notifica a Angular para que actualice la vista
      this.cdr.detectChanges();
    });
  }

  deleteImage(){
    const image: Image = {
      name: this.imageName,
      path: this.options.pathImage,
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
    const theme = localStorage.getItem('kt_theme_mode_value');
    this.imagePreview = 'assets/media/svg/files/';
    this.imagePreview = theme === 'light' ? this.imagePreview + 'blank-image.svg' :  this.imagePreview + 'blank-image-dark.svg';
  }
}
