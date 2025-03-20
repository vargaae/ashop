import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, User } from '@angular/fire/auth'; // Import modular API for Auth
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // Import modular API for Firestore
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: Observable<User | null>; // Observable that holds the user information

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user = of(null); // Initialize the user as an Observable
  }

  ngOnInit(): void {
    const authInstance = getAuth(); // Get the auth instance
    onAuthStateChanged(authInstance, async (user) => {
      // Listen to auth state changes
      if (user) {
        const emailLower = user.email?.toLowerCase();
        if (emailLower) {
          const userDocRef = doc(this.firestore, 'users', emailLower); // Reference to the user's document
          const userDoc = await getDoc(userDocRef); // Get the document
          if (userDoc.exists()) {
            this.user = of(user); // Set the user Observable
          } else {
            console.log('No such document!');
          }
        }
      } else {
        this.user = of(null); // If no user is logged in, set the user to null
      }
    });
  }
}

// export class DashboardComponent implements OnInit {

//     user: Observable<User> | null;

//     // constructor() {
//     // constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
//     constructor(private afAuth: Auth, private firestore: Firestore) {
//         this.user = null;
//     }

//     ngOnInit(): void {
//         this.afAuth.authState.subscribe(user => {
//             if (user) {
//                 let emailLower = user.email.toLowerCase();
//                 this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
//             }
//         }
//     );
//     }
// }
