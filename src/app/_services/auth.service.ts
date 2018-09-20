import { Injectable } from '@angular/core';
import { SessionStorageService } from '@app/_services/session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _sessionStorage: SessionStorageService) { }

    public isSignedIn() {
        return !!this._sessionStorage.accessToken;
    }

    public doSignOut() {
        this._sessionStorage.destroy();
    }

    public doSignIn(accessToken: string, name: string) {
        if (!accessToken || !name) {
            return;
        }

        this._sessionStorage.accessToken = accessToken;
        this._sessionStorage.name = name;
    }
}
