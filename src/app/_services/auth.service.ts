import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SessionStorageService } from '@app/_services/session-storage.service';
import { JwtService } from '@app/_services/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _sessionStorage: SessionStorageService, private _jwtService: JwtService, private _router: Router) { }

    public isSignedIn() {
        return !!this._sessionStorage.accessToken;
    }

    public doSignOut() {
        this._sessionStorage.destroy();
        this.purgeAuth();
    }

    public doSignIn(accessToken: string, name: string) {
        if (!accessToken || !name) {
            return;
        }

        this._sessionStorage.accessToken = accessToken;
        this._sessionStorage.name = name;

        this.setAuth(this._sessionStorage.accessToken);
    }

    setAuth(accessToken) {
        this._jwtService.saveToken(accessToken);
    }

    populate() {
        if (this._jwtService.getToken()) {
            this.doSignIn('demo', this._jwtService.getToken());
            this._router.navigate(['todos']);
        }
    }

    purgeAuth() {
        this._jwtService.destroyToken();
    }
}
