import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick() {
    const dialogRef = this.dialog.open(LogoutButtonDialogContent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.auth.logout();
        this.router.navigate(['login']);
      }
    },
      error => {
        console.log(`Error Callback: ${error}`);
      },
      () => {
        console.log('Completed');
      });
  }
}

@Component({
  selector: 'logout-button-dialog-content',
  templateUrl: './logout-button-dialog-content.html',
})
export class LogoutButtonDialogContent { }
