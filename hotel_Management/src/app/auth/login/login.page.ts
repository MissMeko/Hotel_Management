import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../model/userModel';
import { NavigationExtras, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  isLogin = true;
  username = '';
  password = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
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

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.isLogin = true;

  }

  changeForm() {
    this.loginForm.reset();
    this.registrationForm.reset();
    this.isLogin = !this.isLogin;
  }

  login() {
    console.log('user');
    this.username = this.loginForm.controls['username'].value;
    this.password = this.loginForm.controls['password'].value;
    console.log(this.username, this.password);
    this.generalService.present();
    this.authService.Userlogin(this.username, this.password).then(response => {
      console.log(response);
      this.authService.getCurrentUser().then(res => {
        console.log(res);
        const navigationExtras: NavigationExtras = {
          state: {
            userInfo: res
          }
        };
        this.generalService.dismiss();
        console.log(navigationExtras);
        this.router.navigate(['home'], navigationExtras);
      });
    }).catch(error => {
      console.dir(error);
      this.generalService.dismiss();
      this.generalService.presentPopup('Username or password is incorrect', 'Error');
    });
  }

  register() {
    console.log(this.registrationForm);
    this.generalService.present();
    const user: UserModel = {
      firstName: this.registrationForm.controls['firstName'].value,
      lastName: this.registrationForm.controls['lastName'].value,
      email: this.registrationForm.controls['email'].value,
      phoneNumber: this.registrationForm.controls['phoneNumber'].value,
      password: this.registrationForm.controls['password'].value,
      userType: 'guest',
    };
    this.registrationForm.reset();
    this.authService.UserRegistration(user).then(response => {
      this.authService.getCurrentUser().then(res => {
        this.generalService.dismiss();
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
      this.generalService.dismiss();
      console.dir(error);
      this.generalService.presentPopup('Failed to register', 'Error');
    });
  }
}
