import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SessionStorageService } from '@app/_services/session-storage.service';
import { JwtService } from '@app/_services/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _sessionStorageService: SessionStorageService, private _jwtService: JwtService, private _router: Router) { }

    public isSignedIn() {
        return !!this._sessionStorageService.accessToken;
    }

    public doSignOut() {
        this._sessionStorageService.destroy();
        this.purgeAuth();
    }

    public doSignIn(accessToken: string, name: string) {
        if (!accessToken || !name) {
            return;
        }

        this._sessionStorageService.accessToken = accessToken;
        this._sessionStorageService.name = name;

        this.setAuth(this._sessionStorageService.accessToken);
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
