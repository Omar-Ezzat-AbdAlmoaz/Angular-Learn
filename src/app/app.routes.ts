import { Routes } from '@angular/router';
import { MainLayout } from '../components/main-layout/main-layout';
import { Home } from '../components/home/home';
import { Products } from '../components/products/products';
import { ProductDetails } from '../components/product-details/product-details';
import { SubmitProduct } from '../components/submit-product/submit-product';
import { MasterProducts } from '../components/master-products/master-products';
import { Error } from '../components/error/error';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'products', component: Products },
      { path: 'products/:id', component: ProductDetails },
      { path: 'submit-product', component: SubmitProduct },
      { path: 'submit-product/:id', component: SubmitProduct },
      { path: 'master-products', component: MasterProducts },
    ],
  },
  { path: '**', component: Error },
];
