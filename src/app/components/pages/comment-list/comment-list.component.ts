import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ArticleComment } from 'src/app/entities/article-comment';
import { Page } from 'src/app/interfaces/page';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  displayedColumns: string[] = ['articleTitle', 'handlename', 'content', 'createdAt', 'buttons']

  username!: string | null;
  comments: ArticleComment[] = [];
  length: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25];

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.auth.hasAuthority('ROLE_ADMINISTRATOR').subscribe(
      isAdministrator => {
        if(!isAdministrator) {
          this.auth.getMyUsername().subscribe(username => {
            this.username = username;
            this.refresh(this.username, this.pageIndex, this.pageSize);
          });
        } else {
          this.refresh(this.username, this.pageIndex, this.pageSize);
        }
      }
    );
  }

  update(page: Page<ArticleComment>) {
    this.comments = page.content;
    this.length = page.totalElements;
    this.pageIndex = page.number;
    this.pageSize = page.size;
  }

  refresh(username: string | null, page: number | null, size: number | null) {
    this.commentService.getAll(username, page, size).subscribe(
      next => {
        this.update(next);
      }
    )
  }

  pageEvent(event: PageEvent) {
    this.refresh(this.username, event.pageIndex, event.pageSize);
  }

  delete(comment: ArticleComment) {
    const dialogRef = this.dialog.open(
      DeleteCommentDialog,
      {
        // width: '250px',
        data: comment
      }
    );

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.commentService.delete(comment.id).subscribe(
          () => this.refresh(this.username, this.pageIndex, this.pageSize)
        );
      }
    });
  }

  toggleIsPublished(comment: ArticleComment) {
    const dialogRef = this.dialog.open(
      ToggleCommentIsPublishedDialog,
      {
        // width: '250px',
        data: comment
      }
    );

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.commentService.setIsPublished(comment.id, !comment.isPublished).subscribe(
          () => this.refresh(this.username, this.pageIndex, this.pageSize)
        );
      }
    });
  }
}


@Component({
  selector: 'dialog-delete-comment',
  templateUrl: './dialog-delete-comment.html'
})
export class DeleteCommentDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteCommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleComment) { }
}

@Component({
  selector: 'dialog-toggle-comment-is-published',
  templateUrl: './dialog-toggle-comment-is-published.html'
})
export class ToggleCommentIsPublishedDialog {
  constructor(
    public dialogRef: MatDialogRef<ToggleCommentIsPublishedDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleComment) { }
}