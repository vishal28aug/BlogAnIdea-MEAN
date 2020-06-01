import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let headers = this._authService.getAuthHeader();

    const authRequest = req.clone({
     headers
    })
    return next.handle(authRequest);
  }
}