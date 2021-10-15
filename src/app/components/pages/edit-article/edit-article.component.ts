import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private articleService: ArticleService,
    private authService: AuthService) { }

  targetId!: string | null;

  articleForm = this.fb.group({
    title: [''],
    overview: [''],
    thumbnail: [''],
    content: ['']
  })

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.articleService.get(id).subscribe(
        article => {
          this.authService.getMyUsername().subscribe(
            username => {
              this.authService.hasAuthority('ROLE_ADMINISTRATOR').subscribe(
                hasAuthority => {
                  if(!hasAuthority && article.username !== username) {
                    this.snackBar.open('この記事は編集できません。', '閉じる',
                    {duration: 10000, horizontalPosition: 'start', verticalPosition: 'top', panelClass: ["white-space:pre-line;"]});
                    this.router.navigate(['/articles']);
                  } else {
                    this.articleForm.get('title')?.setValue(article.title);
                    this.articleForm.get('overview')?.setValue(article.overview);
                    this.articleForm.get('thumbnail')?.setValue(article.thumbnail);
                    this.articleForm.get('content')?.setValue(article.content);
                    this.targetId = article.id;
                  }
                }
              )
            }
          )
          
        }
      )
    } else {
      this.targetId = null;
    }
  }
  onSubmit() {
    if (this.targetId == null) {
      this.articleService.post(
        this.articleForm.value.title,
        this.articleForm.value.overview,
        this.articleForm.value.thumbnail,
        this.articleForm.value.content).subscribe(
          next => {
            this.snackBar.open('投稿しました。', '閉じる',
              { duration: 5000, horizontalPosition: 'start', verticalPosition: 'top' });
              this.router.navigate(['/articles']);
          }
        );
    } else {
      this.articleService.update(
        this.targetId,
        this.articleForm.value.title,
        this.articleForm.value.overview,
        this.articleForm.value.thumbnail,
        this.articleForm.value.content).subscribe(
          next => {
            this.snackBar.open('更新しました。', '閉じる',
              { duration: 5000, horizontalPosition: 'start', verticalPosition: 'top' });
          }
        );
    }
  }
}
