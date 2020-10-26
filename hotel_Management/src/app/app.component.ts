import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { NavigationExtras, Router } from '@angular/router';
import { UserModel } from './model/userModel';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  userType: '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.getCurrentUser().then(user => {
        console.log(user);
        this.userType = user.userType; 
        const navigationExtras: NavigationExtras = {
          state: {
            userInfo: user
          }
        };
        this.router.navigate(['home'], navigationExtras);
      }).catch(error => {
        this.router.navigate(['login']);
      });
    });
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
