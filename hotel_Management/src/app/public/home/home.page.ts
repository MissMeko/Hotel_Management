import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomModel, UserModel } from '../../model/userModel';
import { GeneralService } from '../../services/general.service';
import { RoomService } from '../../services/room.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: UserModel;
  allRooms: RoomModel[];
  bookedRooms: RoomModel[];
  currentRooms: RoomModel[];
  availableRooms: RoomModel[];

  showAddForm: boolean;
  searchTerm: string = '';
  dateToday = new Date();

  bookingFormFlag: boolean;
  roomForm: NgForm;
  //add form
  number = '';
  roomType = '';
  price = '';
  rating = '';
  startDate = '';
  endDate = '';
  description = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private generalService: GeneralService,
  ) {
    this.generalService.present();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.userInfo;
      }
      console.log(this.user);
      this.refreshRooms();
      this.generalService.dismiss();
    });


  }

  refreshRooms() {
    this.roomService.getAllRooms().then(response => {
      console.log(response);
      this.allRooms = response;
      this.availableRooms = response.filter(element => element.userId === '');
      this.bookedRooms = response.filter(element => element.userId !== '');
      this.availableRooms.forEach(room => {
        room.showBookingForm = false;
      });
      console.log(this.availableRooms);
    }).catch(error => {
      console.dir(error);
    });
  }

  ngOnInit() {
  }

  showBookingForm(room) {
    room.showBookingForm = !room.showBookingForm;
  }

  calculateTotalPrice(item: RoomModel) {

  }

  processBooking(item: RoomModel) {
    console.log(item);
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const numDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    console.log(numDays.toFixed(0));
    item.totalPricing = item.price * parseInt(numDays.toFixed(0));
    item.userId = this.user.id;
    this.roomService.editRoom(item).then(response => {
      this.generalService.presentBookingConfirmation(`Room Booked for ${numDays.toFixed(0)} days. \n
       Total Price: R${item.totalPricing.toFixed(2)}`, "Success").then(() => {
        this.showBookingForm(item);
        this.refreshRooms();
      });
    }).catch(error => {
      this.generalService.presentPopup("Failed to book room");
    });
  }


  setFilteredItems() {
    console.log(this.availableRooms);
    const tempArray = [];
    this.availableRooms.forEach(room => {
      if (room.roomType && room.roomType.indexOf(this.searchTerm) !== -1) {
        tempArray.push(room);
      }
    });
    this.availableRooms = tempArray;
    if (this.searchTerm === '') {
      this.generalService.present();
      this.refreshRooms();
      this.generalService.dismiss();
    }
  }

  removeRoom(room: RoomModel) {
    this.roomService.deleteRoom(room.id).then(res => {
      this.generalService.dismiss();
      this.refreshRooms();
      this.generalService.presentPopup('Room deleted.', 'Success');
    }).catch(error => {
      this.generalService.dismiss();
      this.generalService.presentPopup('Failed to delete room');
    });
  }

  toggleRoomForm() {
    this.showAddForm = !this.showAddForm;
  }

  async addRoom() {
    this.generalService.present();
    if (this.price !== '' ||
      this.number !== '' ||
      this.roomType !== '' ||
      this.description !== '' ||
      this.rating !== '') {
      const newRoom: RoomModel = {
        number: this.number,
        price: this.price,
        roomType: this.roomType,
        description: this.description,
        endDate: '',
        startDate: '',
        rating: Number(this.rating),
        userId: '',
        checkIn: false,
        imageName: 'room6.jpg',
      };
      this.roomService.addRoom(newRoom).then(res => {
        this.number = '';
        this.roomType = '';
        this.price = '';
        this.rating = '';
        this.startDate = '';
        this.endDate = '';
        this.description = '';
        this.showAddForm = false;
        this.generalService.dismiss();
        this.refreshRooms();
        console.log(res);
      }).catch(error => {
        this.generalService.dismiss();
        console.dir(error);
      });
    } else {
      this.generalService.presentPopup('All fields are required', 'Error');
    }
  }

  uploadImage() {
    console.log('now upload image');
  }

  showReports() {
    this.router.navigate(['reports']);
  }
}
