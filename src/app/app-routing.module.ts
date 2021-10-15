import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { EditArticleComponent } from './components/pages/edit-article/edit-article.component';
import { ArticleListComponent } from './components/pages/article-list/article-list.component';
import { UserListComponent } from './components/pages/user-list/user-list.component';
import { ChangePasswordComponent } from './components/pages/change-password/change-password.component';
import { AuthorityGuard } from './guards/authority.guard';
import { CommentListComponent } from './components/pages/comment-list/comment-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'articles' },
  { path: 'login', component: LoginComponent },
  {
    path: 'users', component: UserListComponent,
    canActivate: [AuthorityGuard],
    data: { requiredAuthority: 'ROLE_ADMINISTRATOR' }
  },
  {
    path: 'articles', component: ArticleListComponent,
    canActivate: [AuthorityGuard],
    data: { requiredAuthority: 'ROLE_CONTRIBUTOR' }
  },
  {
    path: 'article/new', component: EditArticleComponent,
    canActivate: [AuthorityGuard],
    data: { requiredAuthority: 'ROLE_CONTRIBUTOR' }
  },
  {
    path: 'article/:id', component: EditArticleComponent,
    canActivate: [AuthorityGuard],
    data: { requiredAuthority: 'ROLE_CONTRIBUTOR' }
  },
  {
    path: 'comments', component: CommentListComponent,
    canActivate: [AuthorityGuard],
    data: { requiredAuthority: 'ROLE_CONTRIBUTOR' }
  },
  {
    path: 'change-password', component: ChangePasswordComponent,
    canActivate: [AuthorityGuard],
    data: { requiredAuthority: 'ROLE_CONTRIBUTOR' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
