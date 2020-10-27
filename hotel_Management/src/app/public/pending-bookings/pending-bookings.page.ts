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
  isCheckIn: boolean;
  searchTerm: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private authenticationSerivce: AuthenticationService,
    private generalService: GeneralService,
  ) {
    console.log('in here');
    this.authenticationSerivce.getCurrentUser().then(response => {
      this.currentUser = response;
      console.log(this.currentUser);
      this.refreshRooms();
    });
  }

  refreshRooms() {
    this.roomService.getAllRooms().then(response => {
      console.log(response);
      if (this.currentUser.userType === 'cleck') {
        console.log('cleck');
        this.bookedRooms = response.filter(element => element.userId !== '');
      } else {
        console.log('guest');
        this.bookedRooms = response.filter(element => element.userId === this.currentUser.id)
        .filter(element => element.checkIn === false);
      }
      this.bookedRooms.forEach(room => {
        room.showBookingForm = false;
      });
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

  editBooking(room: RoomModel) {
    this.roomService.editRoom(room).then(res => {
      this.generalService.presentPopup('Booking edited', 'Success').then(() => {
        this.refreshRooms();
      });
    }).catch(error => {
      console.dir(error);
      this.generalService.presentPopup('Failed to edit booking', 'Error');
    });
  }

  processRoomCheckin(room: RoomModel, reservation: boolean) {
    let popupMessage = '';
    if (reservation) {
      this.isCheckIn = true;
      popupMessage = `Room ${room.number} checked in`;
    } else {
      room.userId = '';
      this.isCheckIn = false;
      popupMessage = `Room ${room.number} checked out`;
    }
    room.checkIn = reservation;

    this.roomService.editRoom(room).then(res => {
      this.generalService.presentPopup(popupMessage, 'Success').then(() => {
        this.refreshRooms();
      });
    }).catch(error => {
      console.log(error);
      this.generalService.presentPopup('Failed to edit booking', 'Error');
    });
  }

  setFilteredItems() {
    console.log(this.bookedRooms);
    const tempArray = [];
    this.bookedRooms.forEach(room => {
      if (room.roomType && room.roomType.indexOf(this.searchTerm) !== -1) {
        tempArray.push(room);
      }
    });
    this.bookedRooms = tempArray;
    if (this.searchTerm === '') {
      this.generalService.present();
      this.refreshRooms();
      this.generalService.dismiss();
    }
  }

}
