import { Component, OnInit } from '@angular/core'; 
import { Auth, getAuth, onAuthStateChanged, User } from '@angular/fire/auth'; // Firebase modular Auth API
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // Firebase modular Firestore API
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { fade, slide } from '../../../animations';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fade, slide],
})
export class HomeComponent implements OnInit {
  anonymous = 'Visitor';
  user$: Observable<User | null>; // Firebase user
  userData$: Observable<any>; // Firestore user data

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth, // AngularFireAuth helyett Auth modult használunk
    private firestore: Firestore // AngularFirestore helyett Firestore modult használunk
  ) {
    const authInstance = getAuth(); // Az autentikációs példány inicializálása
    this.user$ = new Observable<User | null>((observer) => {
      onAuthStateChanged(authInstance, (user) => {
        observer.next(user);
      });
    });
    this.userData$ = of(null); // Inicializálás
  }

  ngOnInit(): void {
    const authInstance = getAuth();
    onAuthStateChanged(authInstance, async (user) => {
      if (user && user.email) {
        const emailLower = user.email.toLowerCase();
        const userDocRef = doc(this.firestore, 'users', emailLower); // Referencia a Firestore dokumentumhoz
        const userDoc = await getDoc(userDocRef); // Dokumentum lekérdezése
        if (userDoc.exists()) {
          this.userData$ = of(userDoc.data()); // Firestore adatok Observable-ben tárolva
        } else {
          console.log('Nincs ilyen felhasználói dokumentum!');
        }
      }
    });
  }

  logout(): void {
    const authInstance = getAuth();
    authInstance.signOut().then(() => {
      this.router.navigate(['/']); // Kilépés után navigáció a főoldalra
    });
  }
}
