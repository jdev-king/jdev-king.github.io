import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  // },
  // {
  //   path: 'contact',
  //   loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  // },
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
