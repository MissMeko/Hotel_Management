import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { RoomModel, UserModel } from 'src/app/model/userModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralService } from 'src/app/services/general.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-past-bookings',
  templateUrl: './past-bookings.page.html',
  styleUrls: ['./past-bookings.page.scss'],
})
export class PastBookingsPage implements OnInit {
  currentUser: UserModel;
  bookedRooms: RoomModel[];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private userService: UserService,
    private generalService: GeneralService,
    private authenticationSerivce: AuthenticationService,
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
        this.bookedRooms = response.filter(element => element.checkIn === true);
      } else {
        console.log('guest');
        this.bookedRooms = response.filter(element => element.userId === this.currentUser.id)
          .filter(element => element.checkIn === true);
      }
      this.bookedRooms.forEach(room => {
        room.showBookingForm = false;
      });
    }).catch(error => {
      console.dir(error);
    });
  }

  async getBookedUser(userId: string) {
    return await this.userService.getAllUsers().then(users => {
      const bookedUser = users.find(user => user.id === userId);
      return `${bookedUser.firstName}, ${bookedUser.lastName} `;
    });
  }


  ngOnInit() {
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
