import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { RoomService } from 'src/app/services/room.service';
import { RoomModel, UserModel } from '../../model/userModel';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-pending-bookings',
  templateUrl: './pending-bookings.page.html',
  styleUrls: ['./pending-bookings.page.scss'],
})
export class PendingBookingsPage implements OnInit {
  bookedRooms: RoomModel[];
  currentUser: UserModel;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private authenticationSerivce: AuthenticationService,
    private generalService: GeneralService,
  ) {
    this.authenticationSerivce.getCurrentUser().then(response => {
      this.currentUser = response;
      console.log(this.currentUser);
      this.refreshRooms();
    });
  }

  refreshRooms() {
    this.roomService.getAllRooms().then(response => {
      console.log(response);
      this.bookedRooms = response.filter(element => element.userId === this.currentUser.id);
    }).catch(error => {
      console.dir(error);
    });
  }

  ngOnInit() {
  }

  cancelBooking(room: RoomModel) {
    room.userId = '';
    room.endDate = '';
    room.startDate = '';
    this.roomService.editRoom(room).then(res => {
      this.refreshRooms();
      this.generalService.presentPopup("Booking cancelled", "Success");
    }).catch(error => {
      console.dir(error);
      this.generalService.presentPopup("Failed to cancel booking");
    });
  }

}
