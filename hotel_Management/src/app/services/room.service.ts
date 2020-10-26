import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { RoomModel } from '../model/userModel';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooomCollection: AngularFirestoreCollection<RoomModel>;

  constructor(fireStore: AngularFirestore) {
    this.rooomCollection = fireStore.collection<RoomModel>('rooms');
  }

  // async addRoom(room: RoomModel){
  //   return this.rooomCollection.add(room).then;
  // }

  async getAllRooms() {
    return await this.rooomCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ).toPromise();
  }

  async getRoom(id: string) {
    return await this.rooomCollection.doc<RoomModel>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = id;
        return user;
      })
    ).toPromise();
  }

  async editRoom(room: RoomModel) {
    return await this.rooomCollection.doc<RoomModel>(room.id).update(room).then(() => {
      return this.getRoom(room.id);
    });
  }

  async deleteRoom(id: string) {
    return await this.rooomCollection.doc<RoomModel>(id).delete().then(() => {
      return true;
    }).catch((error) => {
      console.dir(error);
      return false;
    });
  }

}
