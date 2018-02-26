import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { CanActivateDashboard, CanActivateHome } from './services/authGaurd.service'
//   import {
//     CanActivateDashboard,
//     CanActivateHome
//   } from './services/authGaurd.service';
// Route Configuration
export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'home',
  //   component: LoginFormComponent
  // },
  {
    path: '',
    component: LoginComponent
    //   canActivate: [CanActivateHome]
  },
  {
    path: 'register',
    component: RegisterComponent
    //   canActivate: [CanActivateHome]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateHome]
    //   canActivate: [CanActivateHome]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)
