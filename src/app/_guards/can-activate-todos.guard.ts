import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// Services
import { AuthService } from '@app/_services/auth.service';

// Imports
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CanActivateTodosGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) { }

    // TODO: Add protection for child (CanActivateChild) and test with route 'http://localhost:4200/todos/filter/hashtag/%23tagName'
    // Take a look closer on CanActivateChild, should we use it for each child component?
    // Example look here 'https://scotch.io/courses/routing-angular-2-applications/canactivate-and-canactivatechild'
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this._authService.isSignedIn()) {
            console.error('Access denied - Redirect to sign-in page');
            this._router.navigate(['/sign-in']);
            return false;
        }

        return true;
    }
}
