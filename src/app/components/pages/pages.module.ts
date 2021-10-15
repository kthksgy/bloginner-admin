import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnisModule } from '../unis/unis.module';
import { MultisModule } from '../multis/multis.module';

import { EditArticleComponent } from './edit-article/edit-article.component';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent, ArticleListDeleteButtonDialogContent } from './article-list/article-list.component';
import { RouterModule } from '@angular/router';
import { UserListComponent, UserListDeleteDialogContent, UserListUpdateDialogContent } from './user-list/user-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CommentListComponent, DeleteCommentDialog, ToggleCommentIsPublishedDialog } from './comment-list/comment-list.component';

const components = [
  LoginComponent,
  ArticleListComponent, ArticleListDeleteButtonDialogContent,
  EditArticleComponent,
  UserListComponent, UserListDeleteDialogContent, UserListUpdateDialogContent,
  ChangePasswordComponent,
  CommentListComponent, ToggleCommentIsPublishedDialog, DeleteCommentDialog
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MaterialModule,
    UnisModule,
    MultisModule
  ],
  exports: components
})
export class PagesModule { }
