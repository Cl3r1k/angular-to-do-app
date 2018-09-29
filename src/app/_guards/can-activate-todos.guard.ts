import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/_services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateTodosGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this._authService.isSignedIn()) {
            console.error('Access denied - Redirect to sign-in page');
            this._router.navigate(['/sign-in']);
            return false;
        }

        return true;
    }
}
