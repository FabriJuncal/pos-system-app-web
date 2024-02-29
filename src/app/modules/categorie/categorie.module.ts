import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { DeleteCategorieComponent } from './components/delete-categorie/delete-categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule, NgbActiveModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from "../../_metronic/shared/shared.module";
import { ComponentsModule } from '../../_metronic/shared/components/components.module';


@NgModule({
    declarations: [
        CategorieComponent,
        CategorieListComponent,
        AddCategorieComponent,
        EditCategorieComponent,
        DeleteCategorieComponent
    ],
    providers: [
        NgbActiveModal,
        NgbPagination
    ],
    imports: [
        CommonModule,
        CategorieRoutingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        InlineSVGModule,
        NgbModalModule,
        NgbDatepickerModule,
        SharedModule,
        ComponentsModule
    ]
})
export class CategorieModule { }
