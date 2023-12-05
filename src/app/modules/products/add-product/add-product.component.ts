import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadSingleImage } from '../../../components/upload-single-image/upload-single-image';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  uploadSingleImageOption: UploadSingleImage;

  title: string;
  sku: string;
  categorie_id: number;
  price_peso: string
  price_usd: string;
  image_file: any;
  image_preview: any;
  summary: string;
  description: string;
  isLoading$: any;


  constructor(
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.isLoading$ = this._categorieService.isLoading$;
    this.initComponents();
  }

  loadPage($event: any){

  }

  addProduct(){

  }

  editProduct(product: any){

  }

  delete(product: any){

  }

  processFile($event: any) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      // this.toaster.open(NoticyAlertComponent, { text: `danger-EL ARCHIVO CARGADO NO ES UNA IMAGEN` });
      return;
    }

    this.image_file = $event.target.files[0];

    this.readImageAsDataUrl(this.image_file)
      .then((result) => {
        this.image_preview = result;
        console.log(this.image_preview);
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

  initComponents(){
    this.uploadSingleImageOption = {
      title: '',
      description: 'Los clientes verán la imagen del producto en su sitio web. Sólo se aceptan archivos de imagen *.png, *.jpg y *.jpeg',
      pathImage: 'products',
      imagePreview: ''
    };
  }

  imageSelected(imagen: any){
    console.log('imagenSelected->', imagen);
    this.image_file = imagen;
  }

}
