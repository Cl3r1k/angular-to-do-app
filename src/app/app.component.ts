import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from '@app/_services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private _authService: AuthService) { }

    ngOnInit(): void {
        this._authService.populate();
    }
}
