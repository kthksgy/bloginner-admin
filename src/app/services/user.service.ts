import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(page: number | null, size: number | null): Observable<Page<User>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let httpParams = new HttpParams()
    if (page != null) {
      httpParams = httpParams.append('page', page);
    }
    if (size != null) {
      httpParams = httpParams.append('size', size);
    }
    let url = '/api/users';
    let queryString = httpParams.toString();
    if (queryString !== '') {
      url = url.concat('?').concat(queryString);
    }
    return this.http.get<Page<User>>(url);
  }

  get(username: string): Observable<User> {
    return this.http.get<User>('/api/user/'.concat(username));
  }

  aboutMe(): Observable<User> {
    return this.http.get<User>('/api/user');
  }

  register(username: string, password: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let body = new HttpParams({ fromObject: { username: username, password: password } });
    return this.http.post(
      '/api/user/register',
      body.toString(),
      httpOptions);
  }

  changePassword(username: string | null, password: string, newPassword: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let body = new HttpParams({ fromObject: { password: password, newPassword: newPassword } });
    if(username != null) {
      body = body.append('username', username);
    }
    return this.http.put(
      '/api/user/change-password',
      body.toString(),
      httpOptions);
  }

  changeRestriction(username: string, restriction: number): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let body = new HttpParams({ fromObject: { username: username, restriction: restriction } });
    return this.http.put(
      '/api/user/change-restriction',
      body.toString(),
      httpOptions);
  }

  remove(username: string): Observable<any> {
    let body = new HttpParams({ fromObject: { username: username } });
    return this.http.delete('/api/user/remove?'.concat(body.toString()));
  }
}
