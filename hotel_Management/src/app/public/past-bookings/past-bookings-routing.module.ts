import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastBookingsPage } from './past-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: PastBookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastBookingsPageRoutingModule {}
