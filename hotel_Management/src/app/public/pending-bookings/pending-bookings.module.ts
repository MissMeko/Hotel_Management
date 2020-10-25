import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingBookingsPageRoutingModule } from './pending-bookings-routing.module';

import { PendingBookingsPage } from './pending-bookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingBookingsPageRoutingModule
  ],
  declarations: [PendingBookingsPage]
})
export class PendingBookingsPageModule {}
