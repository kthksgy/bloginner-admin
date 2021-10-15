import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorResponse } from '../interfaces/error-response';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService,private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone();
    return next.handle(req).pipe(
      catchError(res => {
        switch (res.status) {
          case 400:
          case 401:
          case 403:
          case 404:
          case 500:
            let e: ErrorResponse = res.error;
            if (res.error) {
                // let message = e.message.replace('\\n', '\n');
                // console.log(message);
                this._snackBar.open(`${e.message}`, '閉じる',
                {duration: 10000, horizontalPosition: 'start', verticalPosition: 'top', panelClass: ["white-space:pre-line;"]});
            }
            if(e.code != null && e.code.startsWith('JWT_')) {
              this.auth.logout();
              this.router.navigate(['/login']);
            }
            break;
          default:
            break;
        }
        return throwError(res);
      })
    );
  }
}