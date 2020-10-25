import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from '../model/userModel';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
  ) { }

  async Userlogin(username: string, password: string) {
    const res = await this.afAuth.signInWithEmailAndPassword(username, password);
    return res;
  }

  async UserRegistration(user: UserModel) {
    return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(res => {
      return  this.userService.addUser(user, res.user.uid).then(response => {
        return response;
      });
    }).catch(error => {
      console.dir(error);
      return error;
    });
  }

}
