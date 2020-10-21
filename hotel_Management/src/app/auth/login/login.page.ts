import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogin = true;
  constructor() { 
  }

  ngOnInit() {
    this.isLogin = true;

  }

  changeForm(){
    this.isLogin = !this.isLogin;
    }

}
