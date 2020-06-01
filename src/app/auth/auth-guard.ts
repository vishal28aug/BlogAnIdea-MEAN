import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../utils/services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this._authService.getIsAuth();
        if (isAuth) this._router.navigate(['/login']);
        
        return isAuth
    }

}