import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) { }

  siteInfo: SiteInfo | null = null;

  getTitle(): Observable<SiteInfo>{
    if(this.siteInfo != null) {
      return of(this.siteInfo);
    }
    return this.http.get<SiteInfo>('/api/site-information').pipe(tap(siteInfo => this.siteInfo = siteInfo));
  }
}

export interface SiteInfo {
  title: string;
}