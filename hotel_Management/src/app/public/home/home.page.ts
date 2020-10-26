import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../model/userModel';
import { GeneralService } from '../../services/general.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  imageList = [
    {showBookingForm: false, src: 'assets/img/hotels/hotel_1.jpg'},
    {showBookingForm: false, src: 'assets/img/hotels/hotel_1_2.jpg'},
    {showBookingForm: false, src: 'assets/img/hotels/hotel_1_4.jpg'},
    {showBookingForm: false, src: 'assets/img/hotels/hotel_1_5.jpg'},
    {showBookingForm: false, src: 'assets/img/hotels/hotel_1_6.jpg'}
  ];
  user: UserModel;
  bookingFormFlag: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private generalService: GeneralService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.userInfo;
      }
      console.log(this.user);
    });
   }

  ngOnInit() {
  }

  showBookingForm(room){
    room.showBookingForm = !room.showBookingForm;
  }

  processBooking(item){
    this.generalService.presentBookingConfirmation("Room Booked", "Success").then(() => {
      this.showBookingForm(item);
    });
  }

}
