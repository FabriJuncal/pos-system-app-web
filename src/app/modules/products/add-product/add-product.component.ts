import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TagData } from 'ngx-tagify';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategorieService } from '../../categorie/services/categorie.service';
import { CategorieModel } from '../../categorie/models/categorie.model';
import { AddCategorieComponent } from '../../categorie/components/add-categorie/add-categorie.component';
import { HttpRequestStateService } from '../../../_metronic/shared/services/http-request-state.service';
import { UploadSingleImage } from '../../../_metronic/shared/components/upload-single-image/upload-single-image';
import { UploadMultiImage } from '../../../_metronic/shared/components/upload-multi-image/upload-multi-image';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit  {

  public Editor = ClassicEditor;

  uploadSingleImageOption: UploadSingleImage;
  uploadMultiImageOption: UploadMultiImage;

  categories: CategorieModel[];

  name: string;
  slug: string;
  sku: string;
  barcdode: string;
  price_cost: string;
  price_sale: string;
  tags: TagData[];
  description: string;
  summary: string;
  state = '1';
  image_file: any;
  image_preview: any;
  stock: number;
  categorie_id: number;
  isPhysical = true;
  hasVariety: boolean;

  text: any;

  isLoading$: Observable<number>;

  whitelist$ = new BehaviorSubject<TagData[]>([
    {value: '1', name: 'hello'},
    {value: '2', name: 'world'}
  ]);


  constructor(
    public modal: NgbActiveModal,
    private toastr: ToastrService,
    private _categorieService: CategorieService,
    private _httpRequestState: HttpRequestStateService,
    private modelService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();
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
      description: 'Sus clientes verán la imagen del producto en su sitio web. Sólo se aceptan archivos de imagen *.png, *.jpg y *.jpeg',
      pathImage: 'products',
      imagePreview: ''
    };

    this.uploadMultiImageOption = {
      text: 'Suelte los archivos aquí o haga clic para cargarlos.',
      countFile: 5
    }

    this.getAllCategories();
  }

  imageSelected(imagen: any){
    this.image_file = imagen;
  }

  tagsSelected(tags: TagData[]){
    this.tags = tags;
  }

  getAllCategories(){
    this._categorieService.allCategories()
    .subscribe((resp) => this.categories = resp.categories.data)
  }

  addCategorie(){
    const modalRef = this.modelService.open(AddCategorieComponent, {centered: true, size: 'sm'});
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    // Refrezca la lista luego de agregar una Categoría
    modalRef.componentInstance.categoriesE.subscribe((resp:any) => {
      this.categories.unshift(resp);
    });
  }

}
