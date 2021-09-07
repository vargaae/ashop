import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { CustomFormsModule } from 'ng2-validation';
// import { AppRoutingModule } from '../app-routing.module';

import { MaterialModule } from '../material-module';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
// import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    // AppRoutingModule,
    // SharedRoutingModule,
    FormsModule,
    CustomFormsModule,
    MaterialModule,
    DataTableModule.forRoot(),
    NgbModule,
    AngularFirestoreModule,                                 // imports firebase/firestore, only needed for database features
    AngularFireStorageModule,                               // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule
  ],
  exports: [
    CommonModule,
    // AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    MaterialModule,
    NgbModule,
    AngularFirestoreModule,                                 // imports firebase/firestore, only needed for database features
    AngularFireStorageModule,                               // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
