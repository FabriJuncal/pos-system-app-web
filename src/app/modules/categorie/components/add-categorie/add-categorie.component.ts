import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from '../../services/categorie.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UploadSingleImage } from '../../../../components/upload-single-image/upload-single-image';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {

  @Output() categoriesE: EventEmitter<any> = new EventEmitter();

  uploadSingleImageOption: UploadSingleImage;

  errorMessage: string;
  isLoading$: any;
  isLoading = false;

  isValidImage = false;
  isValidName = false;
  isValidIcon = false;

  name: string;
  icon: string;
  image_file: any;

  constructor(
    private _categorieService: CategorieService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._categorieService.isLoading$;
    this.initComponents();
  }

  processFile($event: any) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toastr.error('EL ARCHIVO CARGADO NO ES UNA IMAGEN');
      return;
    }

    this.image_file = $event.target.files[0];

    this.readImageAsDataUrl(this.image_file)
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

  save(){

    if(this.validateFields()){
      this.toastr.error('DEBE COMPLETAR TODOS LOS CAMPOS');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('image_file', this.image_file);
    formData.append('icon', this.icon);
    this._categorieService.createCategorie(formData)
    .pipe(
      catchError((message) => {
        this.errorMessage = message.error.errors;
        this.toastr.error(this.errorMessage);
        return of(undefined);
      })
    ).subscribe((resp:any) => {
      if(resp.status){
        this.toastr.success(resp.message);
        this.modal.close();
        this.categoriesE.emit(resp.categorie);
      }
    });
  }

  initComponents(){
    this.uploadSingleImageOption = {
      title: 'Imagen de Categoría:',
      description: 'Los clientes verán la imagen de la categoría en su sitio web. Sólo se aceptan archivos de imagen *.png, *.jpg y *.jpeg',
      pathImage: 'categories',
      imagePreview: ''
    };
  }

  imageSelected(imagen: any){
    console.log('imagenSelected->', imagen);
    this.image_file = imagen;
  }

  validateFields(){
    this.isValidImage = this.image_file ? false : true;
    this.isValidName = this.name ? false : true;
    this.isValidIcon = this.icon ? false : true;

    if(this.isValidImage || this.isValidName || this.isValidIcon){
      return true;
    }

    return false;
  }

}
