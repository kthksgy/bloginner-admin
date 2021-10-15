import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../entities/article';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAll(username: string | null, page: number | null, size: number | null): Observable<Page<Article>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let httpParams = new HttpParams()
    if (username != null) {
      // HttpParamsは不変なので再代入の形を取る
      httpParams = httpParams.append('username', username);
    }
    if (page != null) {
      httpParams = httpParams.append('page', page);
    }
    if (size != null) {
      httpParams = httpParams.append('size', size);
    }
    let url = '/api/articles';
    let queryString = httpParams.toString();
    if (queryString !== '') {
      url = url.concat('?').concat(queryString);
    }
    return this.http.get<Page<Article>>(url);
  }

  get(id: string): Observable<Article> {
    return this.http.get<Article>('/api/article/'.concat(id));
  }

  post(title: string, overview: string, thumbnail: string, content: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let body = new HttpParams({ fromObject: { title: title, overview: overview, thumbnail: thumbnail, content: content } });
    return this.http.post(
      '/api/article/post',
      body.toString(),
      httpOptions);
  }

  update(id: string, title: string, overview: string, thumbnail: string, content: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    let body = new HttpParams({ fromObject: { id: id, title: title, overview: overview, thumbnail: thumbnail, content: content } })

    return this.http.put(
      '/api/article/update',
      body.toString(),
      httpOptions);
  }

  remove(id: string): Observable<any> {
    let body = new HttpParams({ fromObject: { id: id } });
    return this.http.delete('/api/article/remove?'.concat(body.toString()));
  }
}