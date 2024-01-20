import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadSingleImage } from '../../../components/upload-single-image/upload-single-image';
import { UploadMultiImage } from '../../../components/upload-multi-image/upload-multi-image';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TagData } from 'ngx-tagify';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  public Editor = ClassicEditor;

  uploadSingleImageOption: UploadSingleImage;
  uploadMultiImageOption: UploadMultiImage

  name: string;
  slug: string;
  sku: string;
  barcdode: string;
  price_cost: string;
  price_sale: string;
  tags: TagData[];
  description: string;
  summary: string;
  state: boolean;
  image_file: any;
  image_preview: any;
  stock: number;
  categorie_id: number;
  variety: any;

  text: any;

  isLoading$: any;

  whitelist$ = new BehaviorSubject<TagData[]>([
    {value: '1', name: 'hello'},
    {value: '2', name: 'world'}
  ]);


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

    this.uploadMultiImageOption = {
      text: 'Suelte los archivos aquí o haga clic para cargarlos.',
      cantFile: 5
    }
  }

  imageSelected(imagen: any){
    this.image_file = imagen;
  }

  tagsSelected(tags: TagData[]){
    this.tags = tags;
  }

}
