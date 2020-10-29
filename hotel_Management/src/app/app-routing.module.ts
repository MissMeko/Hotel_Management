import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./public/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pending-bookings',
    loadChildren: () => import('./public/pending-bookings/pending-bookings.module').then( m => m.PendingBookingsPageModule)
  },
  {
    path: 'past-bookings',
    loadChildren: () => import('./public/past-bookings/past-bookings.module').then( m => m.PastBookingsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./public/reports/reports.module').then( m => m.ReportsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
