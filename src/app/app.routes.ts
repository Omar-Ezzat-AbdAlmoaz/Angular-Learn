import { Routes } from '@angular/router';
import { authChildGuard } from '../guards/auth';

// Routes use loadComponent() for lazy loading — each feature is loaded on demand
// The MainLayout uses canActivateChild to protect all child routes
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/main-layout/main-layout').then((m) => m.MainLayout),
    canActivateChild: [authChildGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../components/home/home').then((m) => m.Home),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../components/products/products').then((m) => m.Products),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('../components/product-details/product-details').then(
            (m) => m.ProductDetails,
          ),
      },
      {
        path: 'submit-product',
        loadComponent: () =>
          import('../components/submit-product/submit-product').then(
            (m) => m.SubmitProduct,
          ),
      },
      {
        path: 'submit-product/:id',
        loadComponent: () =>
          import('../components/submit-product/submit-product').then(
            (m) => m.SubmitProduct,
          ),
      },
      {
        path: 'master-products',
        loadComponent: () =>
          import('../components/master-products/master-products').then(
            (m) => m.MasterProducts,
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../components/login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('../components/signup/signup').then((m) => m.Signup),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../components/error/error').then((m) => m.Error),
  },
];
