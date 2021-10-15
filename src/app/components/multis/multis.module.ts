import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ToolbarComponent } from './menu/toolbar/toolbar.component';
import { MaterialModule } from '../material.module';
import { UnisModule } from '../unis/unis.module';
import { SidenavComponent } from './menu/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

const components = [
  MenuComponent,
  ToolbarComponent,
  SidenavComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,

    UnisModule
  ],
  exports: components
})
export class MultisModule { }
