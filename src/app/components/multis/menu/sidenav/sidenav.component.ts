import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  username!: string;
  constructor(
    public auth: AuthService,
    public menuService: MenuService) { }
  @ViewChild('drawer') drawer!: MatDrawer;

  authorities: string[] = [];
  isAdministrator: boolean = false;
  isContributor: boolean = false;

  ngOnInit(): void {
    this.auth.getMyUsername().subscribe(username => this.username = username);
    this.auth.getAuthorities().subscribe(authorities => {
      this.isAdministrator = authorities.includes('ROLE_ADMINISTRATOR');
      this.isContributor = authorities.includes('ROLE_CONTRIBUTOR');
    });
  }

  toggle() {
    if(this.drawer.opened) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }

}
