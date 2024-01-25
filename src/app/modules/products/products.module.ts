import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule, NgbActiveModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from "../../_metronic/shared/shared.module";
import { ComponentsModule } from '../../components/components.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ListProductVariationsComponent } from './components/list-product-variations/list-product-variations.component';
import { AddProductVariationsComponent } from './components/add-product-variations/add-product-variations.component';
import { EditProductVariationsComponent } from './components/edit-product-variations/edit-product-variations.component';
import { DeleteProductVariationsComponent } from './components/delete-product-variations/delete-product-variations.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ListProductsComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    ListProductVariationsComponent,
    AddProductVariationsComponent,
    EditProductVariationsComponent,
    DeleteProductVariationsComponent
  ],
  providers: [
    NgbActiveModal,
    NgbPagination
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbDatepickerModule,
    SharedModule,
    ComponentsModule,
    CKEditorModule
  ]
})
export class ProductsModule { }
