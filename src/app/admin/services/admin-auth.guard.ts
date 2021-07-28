import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService
  ) { }

  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
    ): Observable<boolean> {
      return this.auth.appUser$.pipe(
        map(appUser => appUser.isAdmin)
        )
  }
}
