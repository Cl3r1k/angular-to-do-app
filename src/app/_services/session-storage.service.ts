import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    public accessToken: string;
    public name: string;

    constructor() { }

    public destroy(): void {
        this.accessToken = null;
        this.name = null;
    }
}
