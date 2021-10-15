import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  isOpened: boolean = false;
  constructor() { }

  toggleIsOpened() {
    this.isOpened = !this.isOpened;
  }
}
