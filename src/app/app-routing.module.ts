import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  {
    path: 'product', children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'form/:id', component: ProductFormComponent, pathMatch: 'prefix' },
      { path: 'list', component: ProductListComponent },
      { path: 'detail', component: ProductDetailComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
