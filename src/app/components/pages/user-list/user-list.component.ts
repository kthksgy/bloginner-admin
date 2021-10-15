import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/entities/user';
import { Page } from 'src/app/interfaces/page';
import { UserService } from 'src/app/services/user.service';
import { RegisterFormComponent } from '../../unis/register-form/register-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  length: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25];

  constructor(private dialog: MatDialog, private userService: UserService) { }

  registerDialogRef!: MatDialogRef<RegisterFormComponent>;

  users: User[] = [];
  displayedColumns: string[] = ['username', 'createdAt', 'spacer', 'restriction', 'buttons'];

  ngOnInit(): void {
    this.refresh();
  }

  update(page: Page<User>) {
    this.users = page.content;
    this.length = page.totalElements;
    this.pageIndex = page.number;
    this.pageSize = page.size;
  }

  refresh() {
    this.userService.getAll(this.pageIndex, this.pageSize).subscribe(
      next => {
        this.update(next);
      }
    )
  }

  delete(user: User) {
    const dialogRef = this.dialog.open(
      UserListDeleteDialogContent,
      {
        // width: '250px',
        data: user
      }
      );

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.remove(user.username).subscribe(
          () => this.refresh()
        );
      }
    },
      error => {
        console.log(`Error Callback: ${error}`);
      },
      () => {
        console.log('Completed');
      });
  }

  changeRestriction(user: User, newValueString: string) {
    let newRestriction = Number(newValueString);
    console.log("change restriction called");
    const dialogRef = this.dialog.open(
      UserListUpdateDialogContent,
      {
        // width: '250px',
        data: {...user, newRestriction}
      }
      );

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.changeRestriction(user.username, newRestriction).subscribe(
          () => this.refresh()
        );
      }
    },
      error => {
        console.log(`Error Callback: ${error}`);
      },
      () => {
        console.log('Completed');
      });
  }

  pageEvent(event: PageEvent) {
    this.userService.getAll(event.pageIndex, event.pageSize)
      .subscribe(
        next => {
          this.update(next);
          // this.articles = next.content;
          // this.length = next.totalElements;
          // this.pageIndex = next.number;
          // this.pageSize = next.size;
        });
  }

  onRegisterButtonClick() {
    const dialogRef = this.dialog.open(RegisterFormComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.refresh();
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
  selector: 'user-list-delete-dialog-content',
  templateUrl: './user-list-delete-dialog-content.html'
})
export class UserListDeleteDialogContent {
  constructor(
    public dialogRef: MatDialogRef<UserListDeleteDialogContent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}
}

@Component({
  selector: 'user-list-update-dialog-content',
  templateUrl: './user-list-update-dialog-content.html'
})
export class UserListUpdateDialogContent {
  constructor(
    public dialogRef: MatDialogRef<UserListUpdateDialogContent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}