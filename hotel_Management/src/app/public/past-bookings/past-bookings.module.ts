import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastBookingsPageRoutingModule } from './past-bookings-routing.module';

import { PastBookingsPage } from './past-bookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastBookingsPageRoutingModule
  ],
  declarations: [PastBookingsPage]
})
export class PastBookingsPageModule {}
