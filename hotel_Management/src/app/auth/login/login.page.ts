import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../model/userModel';
import { NavigationExtras, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registrationForm: FormGroup;

  isLogin = true;
  username = '';
  password = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private authService: AuthenticationService,
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.isLogin = true;

  }

  changeForm() {
    this.username = '';
    this.password = '';
    this.registrationForm.reset();
    this.isLogin = !this.isLogin;
  }

  login() {
    console.log('user');
    const { username, password } = this;
    this.authService.Userlogin(username, password).then(response => {
        console.log(response);
        this.authService.getCurrentUser().then(res => {
        console.log(res);
        const navigationExtras: NavigationExtras = {
          state: {
            userInfo: res
          }
        };
        console.log(navigationExtras);
        this.router.navigate(['home'], navigationExtras);
      });
    }).catch(error => {
      console.dir(error);
    });
  }

  register() {
    console.log(this.registrationForm);
    const user: UserModel = {
      firstName: this.registrationForm.controls['firstName'].value,
      lastName: this.registrationForm.controls['lastName'].value,
      email: this.registrationForm.controls['email'].value,
      phoneNumber: this.registrationForm.controls['phoneNumber'].value,
      password: this.registrationForm.controls['password'].value,
      userType: 'guest',
    };
    this.authService.UserRegistration(user).then(response => {
      this.authService.getCurrentUser().then(res => {
        console.log(response);
        const navigationExtras: NavigationExtras = {
          state: {
            userInfo: res
          }
        };
        console.log(navigationExtras);
        this.router.navigate(['home'], navigationExtras);
      });
    }).catch(error => {
      console.dir(error);
    });
  }
}
