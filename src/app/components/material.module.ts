import { NgModule } from '@angular/core';

/* https://material.angular.io/components/button/api */
import {MatButtonModule} from '@angular/material/button';
/* https://material.angular.io/components/card/api */
import {MatCardModule} from '@angular/material/card';
/* https://material.angular.io/components/dialog/api */
import {MatDialogModule} from '@angular/material/dialog';
/* https://material.angular.io/components/divider/api */
import { MatDividerModule } from '@angular/material/divider';
/* https://material.angular.io/components/form-field/api */
import {MatFormFieldModule} from '@angular/material/form-field';
/* https://material.angular.io/components/grid-list/api */
import {MatGridListModule} from '@angular/material/grid-list';
/* https://material.angular.io/components/icon/api */
import { MatIconModule } from '@angular/material/icon';
/* https://material.angular.io/components/input/api */
import {MatInputModule} from '@angular/material/input';
/* https://material.angular.io/components/list/api */
import { MatListModule } from '@angular/material/list';
/* https://material.angular.io/components/paginator/api */
import {MatPaginatorModule} from '@angular/material/paginator';
/* https://material.angular.io/components/sidenav/api */
import { MatSidenavModule } from '@angular/material/sidenav';
/* https://material.angular.io/components/snack-bar/api */
import { MatSnackBarModule } from '@angular/material/snack-bar';
/* https://material.angular.io/components/table/api */
import {MatTableModule} from '@angular/material/table';
/* https://material.angular.io/components/toolbar/api */
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatCardModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
