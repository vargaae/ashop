import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { AngularFireModule } from '@angular/fire'; // TODO: upgrade to the new version of AngularFire
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth'; // Import modular API for Auth
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DataTableModule } from 'angular5-data-table';

import { environment } from '../environments/environment';

// import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    CoreModule,
    SharedModule,
    // AdminModule,
    FormsModule,
    // DataTableModule.forRoot(),
    HttpClientModule,
    // AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()), // Auth szolgáltatás biztosítása
    provideFirestore(() => getFirestore()),
    // NgbModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
