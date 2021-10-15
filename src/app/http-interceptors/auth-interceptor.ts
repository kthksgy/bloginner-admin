import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth token from the service.
        const authToken = this.auth.getToken();

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        if (authToken != null) {
            console.log('Authorization Token Set.');
            const reqWithAuthHeader = req.clone({ setHeaders: { Authorization: authToken } });
            return next.handle(reqWithAuthHeader);
        }

        // send cloned request with header to the next handler.
        return next.handle(req);
    }
}