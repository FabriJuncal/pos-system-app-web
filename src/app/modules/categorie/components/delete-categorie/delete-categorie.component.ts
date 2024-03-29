import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from '../../services/categorie.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategorieModel } from '../../models/categorie.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestStateService } from '../../../../_metronic/shared/services/http-request-state.service';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.scss']
})
export class DeleteCategorieComponent implements OnInit {

  @Input() categorie_selected: CategorieModel;
  @Output() categoriesE: EventEmitter<any> = new EventEmitter();

  URL_IMAGE_CATEGORIE= `${environment.urlImages}/categories/`;

  errorMessage: string;
  isLoading$: Observable<number>;
  isLoading = false;

  name: string;
  icon: string;
  image_file: any;
  image_preview: any;

  constructor(
    private _categorieService: CategorieService,
    private _httpRequestState: HttpRequestStateService,
    public modal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.isLoading$ = this._httpRequestState.getRequestState();
    this.loadForm();
  }

  loadForm(){
    this.name = this.categorie_selected.name;
    this.icon = this.categorie_selected.icon;
    this.image_preview = this.URL_IMAGE_CATEGORIE + this.categorie_selected.image;
  }

  processFile($event: any) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toastr.error('EL ARCHIVO CARGADO NO ES UNA IMAGEN');
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

  delete(){
    this._categorieService.delete(this.categorie_selected.id)
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
        this.categoriesE.emit(this.categorie_selected);
      }
    });
  }

}
