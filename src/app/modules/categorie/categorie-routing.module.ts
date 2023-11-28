import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieComponent } from './categorie.component';

const routes: Routes = [
  {
    path: '',
    component: CategorieComponent,
    children: [
      {
        path: 'list',
        component: CategorieListComponent
      },
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: 'list', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieRoutingModule { }
