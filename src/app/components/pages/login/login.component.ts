import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  strNextPage: string = '';
  strLoadingMsg: string = "ログイン処理中です";

  error: boolean = false;

  ngOnInit(): void {
    // ActivatedRouteを使ってログイン成功時の移動先を取得
    if (this.route.snapshot.queryParams.hasOwnProperty('url')) {
      this.strNextPage = this.route.snapshot.queryParams.url;
    } else {
      this.strNextPage = "";
    }
  }

  onSubmit() {
    this.auth
      .login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe(
        /* next: オブザーバーにストリームの次の値が到着した時のコールバック関数 */
        value => {
          console.log('Login Succeeded');
          this.router.navigate(['/']);
        },
        /* error: エラー発生時のコールバック関数 */
        error => {
          console.log('error called')
        },
        /* complete: オブザーバーが完了通知を受け付けた時のコールバック関数 */
        () => {
          console.log('complete called');
        })
  }

  inputUsernameAutomatically() {
    /* .setValue(): 構造にエラーは許されない */
    this.loginForm.setValue({
      username: ''
    })
    /* .patchValue(): 構造にエラーがある場合は失敗するのみ */
    this.loginForm.patchValue({
      username: ''
    })
  }

  // login() {
  //   this.authenticationService.login(this.credentials, () => {
  //     this.router.navigateByUrl('/');
  //   });
  //   return false;
  // }

}
