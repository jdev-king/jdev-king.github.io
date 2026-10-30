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
  // Individual routes for Architecture Details
  {
    path: 'architectures/analytics-bridge',
    loadComponent: () =>
      import('./features/architectures/details/analytics-bridge/analytics-bridge.component').then(
        (m) => m.AnalyticsBridgeComponent
      ),
  },
  {
    path: 'architectures/nexusflow-v1',
    loadComponent: () =>
      import('./features/architectures/details/nexus-flow/nexus-flow.component').then(
        (m) => m.NexusFlowComponent
      ),
  },
  {
    path: 'architectures/sintad-ai-agent',
    loadComponent: () =>
      import('./features/architectures/details/sintad-ai-agent/sintad-ai-agent.component').then(
        (m) => m.SintadAiAgentComponent
      ),
  },
  // Fallback for old route style or redirect?
  // We can redirect the generic :id to the specific ones if needed, or just let them 404 if not matched.
  // For now, I will remove the generic :id route since we want individual pages.
  {
    path: 'mastering-stack',
    loadComponent: () =>
      import('./features/mastering-stack/mastering-stack.component').then(
        (m) => m.MasteringStackComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
