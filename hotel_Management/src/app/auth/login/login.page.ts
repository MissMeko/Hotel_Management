import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogin = true;
  username = '';
  password = '';

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.isLogin = true;

  }

  changeForm() {
    this.isLogin = !this.isLogin;
  }

  login() {
    console.log('in here');
    const { username, password } = this;
    this.authService.Userlogin(username, password).then(response => {
      console.log(response);
    }).catch(error => {
      console.dir(error);
    });
  }
}
