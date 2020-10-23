import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth

  ) { }

  async Userlogin(username: string, password: string){
    const res = await this.afAuth.signInWithEmailAndPassword(username, password);
    return res;
  }
}
