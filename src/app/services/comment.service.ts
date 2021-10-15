import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleComment } from '../entities/article-comment';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  getAll(username: string | null, page: number | null, size: number | null): Observable<Page<ArticleComment>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let httpParams = new HttpParams()
    if (username != null) {
      httpParams = httpParams.append('username', username);
    }
    if (page != null) {
      httpParams = httpParams.append('page', page);
    }
    if (size != null) {
      httpParams = httpParams.append('size', size);
    }
    let url = '/api/comments';
    let queryString = httpParams.toString();
    if (queryString !== '') {
      url = url.concat('?').concat(queryString);
    }
    return this.http.get<Page<ArticleComment>>(url);
  }

  post(articleId: string, handlename: string, content: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let httpParams = new HttpParams({ fromObject: { articleId: articleId, handlename: handlename, content: content } })
    return this.http.post(
      '/api/comment/post',
      httpParams.toString(),
      httpOptions);
  }

  setIsPublished(id: string, isPublished: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let httpParams = new HttpParams({ fromObject: { id: id, isPublished: isPublished } })
    return this.http.put(
      '/api/comment/is-published',
      httpParams.toString(),
      httpOptions);
  }

  delete(id: string): Observable<any> {
    let httpParams = new HttpParams({ fromObject: { id: id } })
    return this.http.delete('/api/comment/delete?'.concat(httpParams.toString()));
  }
}
