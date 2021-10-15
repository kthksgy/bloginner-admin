import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorityGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // TODO 実装
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    // return true;
    return this.auth.getAuthorities().pipe(
      map(myAuthorities => {
        if (myAuthorities.includes(route.data.requiredAuthority)) {
          return true;
        } else {
          this.snackBar.open('このページへは遷移出来ません。', '閉じる',
            { duration: 10000, horizontalPosition: 'start', verticalPosition: 'top', panelClass: ["white-space:pre-line;"] });
          return false;
        }

      })
    );
  }

}
