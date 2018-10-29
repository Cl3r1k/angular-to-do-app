import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { ApiService } from '@app/_services/api.service';
import { ApiMockService } from '@app/_services/api-mock.service';
import { AuthService } from '@app/_services/auth.service';

// Components
import { SignInComponent } from './sign-in.component';

describe('Component: SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;
    let authService: AuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignInComponent],
            imports: [ReactiveFormsModule, RouterTestingModule],
            providers: [
                {
                    provide: ApiService,
                    useClass: ApiMockService
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();

        authService = TestBed.get(AuthService);
    });

    it(`should create an instance of 'SignInComponent'`, () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it(`should have initial values`, () => {
        // Arrange

        // Act

        // Assert
        expect(component.isBusy).toEqual(false);
        expect(component.hasFailed).toEqual(false);
        expect(component.showInputErrors).toEqual(false);
        expect(component.authType).toEqual('');
    });

    it(`form invalid when empty`, () => {
        // Arrange

        // Act

        // Assert
        expect(component.frm.valid).toBeFalsy();
    });

    it(`'username' field validity`, () => {
        // Arrange

        // Act
        const username = component.frm.controls['username'];

        // Assert
        expect(username.valid).toBeFalsy();
    });

    it(`'username' field 'required' validity`, () => {
        // Arrange
        let errors = {};

        // Act
        const username = component.frm.controls['username'];
        errors = username.errors || {};

        // Assert
        expect(errors['required']).toBeTruthy();
    });

    it(`'username' field with data should be valid and 'required' should be undefined`, () => {
        // Arrange
        let errors = {};

        // Act
        const username = component.frm.controls['username'];
        username.setValue('testUsername');
        errors = username.errors || {};

        // Assert
        expect(username.valid).toBeTruthy();
        expect(errors['required']).toEqual(undefined);
    });

    it(`'password' field validity`, () => {
        // Arrange

        // Act
        const password = component.frm.controls['password'];

        // Assert
        expect(password.valid).toBeFalsy();
    });

    it(`'password' field 'required' validity`, () => {
        // Arrange
        let errors = {};

        // Act
        const password = component.frm.controls['password'];
        errors = password.errors || {};

        // Assert
        expect(errors['required']).toBeTruthy();
    });

    it(`'password' field with data should be valid and 'required' should be undefined`, () => {
        // Arrange
        let errors = {};

        // Act
        const password = component.frm.controls['password'];
        password.setValue('testPassword');
        errors = password.errors || {};

        // Assert
        expect(password.valid).toBeTruthy();
        expect(errors['required']).toEqual(undefined);
    });

    describe(`#doSignIn()`, () => {
        it(`should call method 'authService.doSignIn()'`, () => {
            // Arrange

            // Act
            spyOn(authService, 'doSignIn');
            expect(component.frm.valid).toBeFalsy();
            component.frm.controls['username'].setValue('demoName');
            component.frm.controls['password'].setValue('demoPassword');
            expect(component.frm.valid).toBeTruthy();

            // Trigger 'doSignIn' function
            component.doSignIn();

            // Assert
            expect(authService.doSignIn).toHaveBeenCalled();
        });
    });

});
