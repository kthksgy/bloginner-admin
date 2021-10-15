import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterFormComponent>) { }

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.registerForm.value.username, this.registerForm.value.password).subscribe(
      () => {
        this.snackBar.open('登録が成功しました。', '閉じる',
        {duration: 10000, horizontalPosition: 'start', verticalPosition: 'top', panelClass: ["white-space:pre-line;"]});
        this.dialogRef.close(true);
    }
    );
  }
}
