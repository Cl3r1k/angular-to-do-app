import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/_services/api.service';
import { AuthService } from '@app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    public frm: FormGroup;

    public isBusy = false;
    public hasFailed = false;
    public showInputErrors = false;

    constructor(
        private _apiService: ApiService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
        this.frm = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    public doSignIn() {

        // Make sure form values are valid
        if (this.frm.invalid) {
            this.showInputErrors = true;
            return;
        }

        // Reset status
        this.isBusy = true;
        this.hasFailed = false;

        // Grab values from form
        const username = this.frm.get('username').value;
        const password = this.frm.get('password').value;

        // Submit request to API
        this._apiService.signIn(username, password).subscribe((response) => {
            this._authService.doSignIn(response['token'], response['name']);
            this._router.navigate(['todos']);
        },
            (error) => {
                this.isBusy = false;
                this.hasFailed = true;
            });
    }

}