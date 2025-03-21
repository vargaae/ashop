import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$: Observable<any>; // Observable, amely tartalmazza a user adatait, beleértve az accountType-ot
  // user$: Observable<firebase.default.User>

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = of(null); // Kezdőérték beállítása
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user) => {
      console.log("works")
      if (user && user.email) {
        const emailLower = user.email.toLowerCase();
        const userDocRef = doc(this.firestore, 'users', emailLower); // Hivatkozás a Firestore user dokumentumra
        const userDoc = await getDoc(userDocRef); // Dokumentum lekérése
        if (userDoc.exists()) {
          this.user$ = of(userDoc.data()); // Az Observable-t frissítjük a Firestore dokumentum adatával
        }
      } else {
        console.log(user) 
        this.user$ = of(null); // Ha nincs bejelentkezve a felhasználó, null értéket adunk
      }
    });
  }
}
