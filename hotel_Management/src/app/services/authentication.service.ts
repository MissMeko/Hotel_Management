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
    console.log('in here');
    this.afAuth.signInWithEmailAndPassword(username, password).then(res1 => {
      console.log(res1);
    })
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

  async getCurrentUser(){
    return this.afAuth.currentUser.then(user => {
      return this.userService.getUser(user.uid);
    });
  }

  async logOut() {
    return await this.afAuth.signOut();
  }

}
