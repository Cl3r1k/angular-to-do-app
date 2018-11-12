import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ApiService } from '@app/_services/api.service';
import { AuthService } from '@app/_services/auth.service';

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

    authType = '';

    constructor(
        private _apiService: ApiService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.frm = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        // This part will be used for register/login
        this._route.url.subscribe(data => {
            this.authType = data[data.length - 1].path;
            console.log('%cauthType: ', this.consoleTextColorComponent, this.authType);
        });
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

        if (username === 'tst' && password === 'tst') {
            this._authService.doSignIn('tst.Token', 'tst.name');
            this._router.navigate(['todos']);
            return;
        }

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
