import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'architectures',
    loadComponent: () =>
      import('./features/architectures/gallery/architectures-gallery.component').then(
        (m) => m.ArchitecturesGalleryComponent
      ),
  },
  {
    path: 'architectures/:id',
    loadComponent: () =>
      import('./features/architectures/detail/architecture-detail.component').then(
        (m) => m.ArchitectureDetailComponent
      ),
  },
  {
    path: 'case-studies',
    loadComponent: () =>
      import('./features/case-studies/case-studies.component').then(
        (m) => m.CaseStudiesComponent
      ),
  },
  {
    path: 'prototype/architectures',
    loadComponent: () =>
      import('./features/architectures/gallery/architectures-gallery.component').then(
        (m) => m.ArchitecturesGalleryComponent
      ),
  },
  {
    path: 'prototype/case-studies',
    loadComponent: () =>
      import('./features/case-studies/case-studies.component').then(
        (m) => m.CaseStudiesComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
