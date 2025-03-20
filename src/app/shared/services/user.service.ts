import { Injectable, Inject } from '@angular/core';
import { getDatabase, ref, update, get } from '@angular/fire/database';
import firebase from 'firebase/app';

import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // No need for AngularFireDatabase anymore, use Firebase's new methods.
  constructor() {}

  save(user: firebase.User) {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    update(userRef, {
      name: user.displayName,
      email: user.email,
    });
  }

  get(uid: string): Promise<AppUser | null> {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + uid);
    return get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val() as AppUser;
      } else {
        return null;
      }
    });
    // get(uid: string): AngularFireObject<AppUser> {
    //   return this.db.object('/users/' + uid);
  }
}
