import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService) { }

  changePasswordForm = this.fb.group({
    password: ['', Validators.required],
    newPassword: ['', Validators.required]
  })
  ngOnInit(): void {
  }
  onSubmit() {
    this.userService.changePassword(null, this.changePasswordForm.value.password, this.changePasswordForm.value.newPassword).subscribe(
      () => {
        this.snackBar.open('変更に成功しました。', '閉じる', {duration: 10000, horizontalPosition: 'start', verticalPosition: 'top', panelClass: ["white-space:pre-line;"]});
      }
    )
  }
}
