import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './helpers';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: '**',
    redirectTo: '/login',
    canActivate: [AuthGuard]
  },
];