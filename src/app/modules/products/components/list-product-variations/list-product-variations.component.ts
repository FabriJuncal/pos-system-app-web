import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductVariationsService } from '../../services/product-variations.service';
import { ProductVariationsModel } from '../../models/product-variations.model';
import { AddProductVariationsComponent } from '../add-product-variations/add-product-variations.component';
import { EditProductVariationsComponent } from '../edit-product-variations/edit-product-variations.component';
import { DeleteProductVariationsComponent } from '../delete-product-variations/delete-product-variations.component';

@Component({
  selector: 'app-list-product-variations',
  templateUrl: './list-product-variations.component.html',
  styleUrls: ['./list-product-variations.component.scss']
})
export class ListProductVariationsComponent implements OnInit   {

  URL_PRODUCT_VARIATIONS= `${environment.urlImages}/products/variations`;
  isLoading$: Observable<boolean>;
  totalPages = 1;
  currentPage = 1;
  search: string;
  productVariations: ProductVariationsModel[] = [];


  constructor(
    private _productVariationsService: ProductVariationsService,
    private modelService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productVariationsService.isLoading$;
    this.allProductVariations();
  }

  allProductVariations(page = 1){
    this._productVariationsService.allProductVariations(page, this.search)
    .subscribe((resp) => {
      console.log('allproductVariations ->', resp);
      this.productVariations = resp.productVariations.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  loadPage(index: number | undefined){
    this.allProductVariations(index);
  }

  reset(){
    this.search = '';
    this.allProductVariations()
  }

  addProductVariations(){
    const modalRef = this.modelService.open(AddProductVariationsComponent, {centered: true, size: 'sm'});
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    // Refrezca la tabla luego de agregar una Categoría
    modalRef.componentInstance.productVariationsE.subscribe((resp:any) => {
      this.productVariations.unshift(resp);
    });
  }

  editProductVariations(productVariation: any){
    console.log('productVariation->', productVariation);
    const modalRef = this.modelService.open(EditProductVariationsComponent, {centered: true, size: 'sm'});
    modalRef.componentInstance.productVariation_selected = productVariation;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    // Refrezca la tabla luego de modificar una Categoría
    modalRef.componentInstance.productVariationsE.subscribe((resp:any) => {
      const INDEX = this.productVariations.findIndex(productVariation => productVariation.id === resp.id);
      this.productVariations[INDEX] = resp;
    });
  }

  deleteProductVariations(productVariation: any){
    const modalRef = this.modelService.open(DeleteProductVariationsComponent, {centered: true, size: 'sm'});
    modalRef.componentInstance.productVariation_selected = productVariation;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    // Refrezca la tabla luego de eliminar una Categoría
    modalRef.componentInstance.productVariationsE.subscribe((resp:any) => {
      const INDEX = this.productVariations.findIndex(productVariation => productVariation.id === resp.id);
      this.productVariations.splice(INDEX, 1);
    });
  }

}
