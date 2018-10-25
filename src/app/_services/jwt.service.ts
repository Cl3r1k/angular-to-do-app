import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    private TOKEN_KEY = 'jwtToken';

    constructor() { }

    getToken() {
        // return window.localStorage[this.TOKEN_KEY];
        return localStorage.getItem(this.TOKEN_KEY);
    }

    saveToken(token: string) {
        // window.localStorage['jwtToken'] = token;
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    destroyToken() {
        window.localStorage.removeItem(this.TOKEN_KEY);
    }
}
