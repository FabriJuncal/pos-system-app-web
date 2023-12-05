import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../modules/users/users.module').then((m) => m.UsersModule),
    // data: { layout: 'light-sidebar' }, // Agrega el tema light al módulo
  },
  {
    path: 'categorie',
    loadChildren: () =>
      import('../modules/categorie/categorie.module').then((m) => m.CategorieModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('../modules/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
