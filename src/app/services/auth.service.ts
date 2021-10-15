import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { LocalStorageService } from './storages/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private http: HttpClient;
  username!: string;
  me: User | null = null;
  authorities: string[] | null = null;
  // me: Subject<User> = new Subject();

  constructor(
    private http: HttpClient,
    // private handler: HttpBackend,
    private lss: LocalStorageService,
    private router: Router) {
    // HttpBackendを引数にするとHttpInterceptorが適用されないHttpClienが作成出来る
    // this.http = new HttpClient(handler);
  }

  login(username: string, password: string): Observable<HttpResponse<Object>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      /* The types of the observe and response options are string unions, rather than plain strings. */
      observe: 'response' as const
    };

    let body = new HttpParams({ fromObject: { username: username, password: password } })
    return this.http.post(
      '/api/login',
      body.toString(),
      httpOptions)
      .pipe(
        tap(x => {
          console.log(x);
          const jwt = x.headers.get('Authorization');
          if (jwt != null) {
            this.setToken(jwt);
          }
          if(x.body != null) {
            let body: any = x.body;
            if(body.username != null) {
              this.username = body.username;
            }
          }
        }));
  }

  isLoggedIn(): boolean {
    return this.lss.getItem('_jwt') != null;
  }

  getToken(): string | null {
    return this.lss.getItem('_jwt');
  }

  setToken(jwt: string): void {
    this.lss.setItem('_jwt', jwt);
  }

  getMyUsername(): Observable<string> {
    if(this.me != null) {
      return of(this.me.username);
    } else {
      return this.http.get<User>('/api/me').pipe(
        tap(x => this.me = x),
        map(x => x.username)
      );
    }
  }

  logout() {
    // LocalStorageに保存したトークンを削除する
    this.lss.removeItem('_jwt');
    this.authorities = null;
    this.me = null;
    this.router.navigate(['/login']);
  }

  getAuthorities(): Observable<string[]> {
    if(this.authorities != null) {
      return of(this.authorities);
    } else {
      return this.http.get<string[]>('/api/my-authorities').pipe(
        tap(x => {
          this.authorities = x;
        })
      );
    }
  }

  hasAuthority(authority: string): Observable<boolean> {
    return this.getAuthorities().pipe(map(authorities => authorities.includes(authority))); 
  }
}

export interface MyCredentials {
  username: string;
  roles: string[];
}