import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../model/userModel';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  imageList = [
    'assets/img/hotels/hotel_1.jpg',
    'assets/img/hotels/hotel_1_2.jpg',
    'assets/img/hotels/hotel_1_3.jpg',
    'assets/img/hotels/hotel_1_4.jpg',
    'assets/img/hotels/hotel_1_5.jpg',
    'assets/img/hotels/hotel_1_6.jpg',
    'assets/img/hotels/hotel_1.jpg',
    'assets/img/hotels/hotel_1_2.jpg',
    'assets/img/hotels/hotel_1_3.jpg',
    'assets/img/hotels/hotel_1_4.jpg',
    'assets/img/hotels/hotel_1_5.jpg',
    'assets/img/hotels/hotel_1_6.jpg',
  ];
  user: UserModel;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

}
