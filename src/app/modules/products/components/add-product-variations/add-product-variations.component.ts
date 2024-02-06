import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UploadSingleImage } from '../../../../components/upload-single-image/upload-single-image';
import { ProductVariationsService } from '../../services/product-variations.service';
import { InfoMessageModel } from 'src/app/components/info-message/info-message.model';

@Component({
  selector: 'app-add-product-variations',
  templateUrl: './add-product-variations.component.html',
  styleUrls: ['./add-product-variations.component.scss']
})
export class AddProductVariationsComponent implements OnInit {

  @Output() variationsE: EventEmitter<any> = new EventEmitter();

  uploadSingleImageOption: UploadSingleImage;
  infoMessageOption: InfoMessageModel;
  hideTextInput = true;
  acceptLabel = 'Aceptar';
  cancelLabel = 'cancelar';

  errorMessage: string;
  isLoading$: any;
  isLoading = false;

  isValidImage = false;
  isValidColor = false;
  isValidMaterial = false;
  isValidSize = false;
  isValidWeight = false;
  isValidQuantity = false;

  image_file: any;
  color: string;
  material: string;
  size: string;
  weight: string;
  quantity: string;

  constructor(
    private _productVariationsService: ProductVariationsService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productVariationsService.isLoading$;
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
    formData.append('name', this.color);
    formData.append('image_file', this.image_file);
    // formData.append('icon', this.icon);
    this._productVariationsService.createProductVariations(formData)
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
        this.variationsE.emit(resp.variations);
      }
    });
  }

  initComponents(){
    this.uploadSingleImageOption = {
      title: 'Imagen de la Variación:',
      description: 'Sus clientes verán la imagen de la variación en su sitio web. Sólo se aceptan archivos de imagen *.png, *.jpg y *.jpeg',
      pathImage: 'variations',
      imagePreview: ''
    };

    this.infoMessageOption = {
      title: 'Puntos a tener en cuenta:',
      items: [
        'Si no agrega una imagen, se utilizará la imagen de portada para mostrar esta variación del producto.',
        'Es obligatorio completar algunos de los siguientes campos: Color, Material, Tamaño.'
      ]
    }
  }

  imageSelected(imagen: any){
    console.log('imagenSelected->', imagen);
    this.image_file = imagen;
  }

  validateFields(){
    // this.isValidImage = this.image_file ? false : true;
    this.isValidColor = this.color ? false : true;
    this.isValidMaterial = this.material ? false : true;
    this.isValidSize = this.size ? false : true;
    // this.isValidWeight = this.weight ? false : true;
    // this.isValidQuantity = this.quantity ? false : true;

    if(this.isValidColor || this.isValidMaterial || this.isValidSize){
      return true;
    }

    return false;
  }

}
