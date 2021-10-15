import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  authorities: string[] = [];

  @ViewChild('sidenav') sidenav!: SidenavComponent;
  @ViewChild('toolbar') toolbar!: ToolbarComponent;
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  onMenuButtonClick() {
    // this.sidenav.drawer.toggle();
    this.menuService.toggleIsOpened();
  }
}
