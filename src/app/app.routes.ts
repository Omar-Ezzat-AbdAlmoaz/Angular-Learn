import { Routes } from '@angular/router';
import { MainLayout } from '../components/main-layout/main-layout';
import { Home } from '../components/home/home';
import { Products } from '../components/products/products';
import { ProductDetails } from '../components/product-details/product-details';
import { SubmitProduct } from '../components/submit-product/submit-product';
import { MasterProducts } from '../components/master-products/master-products';
import { Login } from '../components/login/login';
import { Signup } from '../components/signup/signup';
import { Error } from '../components/error/error';
import { authGuard } from '../guards/auth';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home, canActivate: [authGuard] },
      { path: 'products', component: Products, canActivate: [authGuard] },
      { path: 'products/:id', component: ProductDetails, canActivate: [authGuard] },
      { path: 'submit-product', component: SubmitProduct, canActivate: [authGuard] },
      { path: 'submit-product/:id', component: SubmitProduct, canActivate: [authGuard] },
      { path: 'master-products', component: MasterProducts, canActivate: [authGuard] },
    ],
  },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: '**', component: Error },
];
