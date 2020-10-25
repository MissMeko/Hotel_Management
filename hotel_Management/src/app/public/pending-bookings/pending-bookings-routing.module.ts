import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingBookingsPage } from './pending-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: PendingBookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingBookingsPageRoutingModule {}
