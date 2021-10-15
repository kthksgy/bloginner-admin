import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LogoutButtonComponent, LogoutButtonDialogContent } from './logout-button/logout-button.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
  LogoutButtonComponent, LogoutButtonDialogContent,
  RegisterFormComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: components
})
export class UnisModule { }
