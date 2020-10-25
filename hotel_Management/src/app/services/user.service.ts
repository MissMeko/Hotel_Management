import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { UserModel } from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private userCollection: AngularFirestoreCollection<UserModel>;

  constructor(fireStore: AngularFirestore) { 
    this.userCollection = fireStore.collection<UserModel>('users');
  }

  async addUser(user: UserModel, uid: string) {
   return this.userCollection.doc(uid).set(user).then(() => {
     return this.getUser(uid);
   });
  }

 async getAllUsers() {
    return await this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    ).toPromise();
  }

  async getUser(id: string) {
    return await this.userCollection.doc<UserModel>(id).valueChanges().pipe(
      take(1),
      map( user => {
        user.id = id;
        return user;
      })
    ).toPromise();
  }
}
