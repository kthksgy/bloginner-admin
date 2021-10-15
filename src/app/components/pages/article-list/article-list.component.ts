import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Article } from 'src/app/entities/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  // TODO URLパラメータから読み取るように変更
  length: number = 0;
  pageIndex: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25];

  username!: string | null;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private articleService: ArticleService) { }
  displayedColumns: string[] = ['title', 'overview', 'username', 'createdAt', 'buttons'];
  articles: Article[] = [];

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

  refresh(username: string | null, page: number | null, size: number | null) {
    this.articleService.getAll(username, page, size)
      .subscribe(
        next => {
          this.articles = next.content;
          this.length = next.totalElements;
          this.pageIndex = next.number;
          this.pageSize = next.size;
        });
  }

  page(event: PageEvent) {
    this.refresh(this.username, event.pageIndex, event.pageSize);
  }

  delete(article: Article) {
    const dialogRef = this.dialog.open(
      ArticleListDeleteButtonDialogContent,
      {
        // width: '250px',
        data: article
      }
      );

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.articleService.remove(article.id).subscribe(
          () => this.refresh(this.username, this.pageIndex, this.pageSize)
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

}
@Component({
  selector: 'article-list-delete-button-dialog-content',
  templateUrl: './article-list-delete-button-dialog-content.html'
})
export class ArticleListDeleteButtonDialogContent {
  constructor(
    public dialogRef: MatDialogRef<ArticleListDeleteButtonDialogContent>,
    @Inject(MAT_DIALOG_DATA) public data: Article) {}
}