import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { ApiService } from '@app/_services/api.service';
import { ApiMockService } from '@app/_services/api-mock.service';

// Components
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;
    let inputUsernameEl;
    let inputPasswordEl;

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

        // inputUsernameEl = fixture.debugElement.query(By.css('input[formControlName=username]'));        // Find input username element
        // inputPasswordEl = fixture.debugElement.query(By.css('input[formControlName=password]'));        // Find input password element

        // inputUsernameEl.value = 'demoName';
        // inputPasswordEl.value = 'demoPass';
        // console.log('%cinputUsernameEl:', 'color: pink;', inputUsernameEl);
        // console.log('%cinputPasswordEl:', 'color: pink;', inputPasswordEl);

        fixture.detectChanges();
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

    describe(`#doSignIn()`, () => {
        it(`should ...'`, () => {
            // Arrange
            // sessionStorageService.accessToken = 'Access.Token';
            // sessionStorageService.name = 'Access.Name';

            // console.log('%cCalling ngOnInit', 'color: pink;');
            // component.ngOnInit();

            // // component.frm.setValue({
            // //     username: 'NameUser',
            // //     password: 'passwordUser'
            // // });
            // // // component.frm.setValue({ password: 'passwordUser' });
            // const username = this.frm.get('username').value;
            // console.log('%cusername:', 'color: pink;', username);

            // Act
            // sessionStorageService.destroy();

            // Assert
            // expect(sessionStorageService.accessToken).toEqual(null);
            // expect(sessionStorageService.name).toEqual(null);
        });
    });

    describe(`#view tests:`, () => {

        describe(`input.username:`, () => {
            it(`'blur' should change 'username' state (async)`, async(() => {
                // Arrange

                // Act
                // spyOn(component, 'setCompleteHover');

                // Set checkbox.toggle 'mouseenter' hover state
                // let usernameField = component.frm.get('username').hasError('required');
                // console.log('%cusernameField:', 'color: pink;', usernameField);
                // inputUsernameEl.triggerEventHandler('click', null);
                // console.log('inputUsernameEl:', inputUsernameEl.value);
                // fixture.detectChanges();
                // console.log('%cinputUsernameEl:', 'color: pink;', inputUsernameEl);

                // inputUsernameEl.value = '123';
                // console.log('inputUsernameEl:', inputUsernameEl.value);
                // usernameField = component.frm.get('username').hasError('required');
                // console.log('%cusernameField:', 'color: pink;', usernameField);
                console.log('frm.value: ', component.frm.value);
                console.log('frm.invalid: ', component.frm.invalid);

                // Assert
                // fixture.whenStable().then(() => {
                //     expect(component.setCompleteHover).toHaveBeenCalled();
                // });
            }));
            // it(`'mouseenter' on 'checkbox.toggle' should call method 'setCompleteHover()' (async)`, async(() => {
            //     // Arrange

            //     // Act
            //     spyOn(component, 'setCompleteHover');

            //     // Set checkbox.toggle 'mouseenter' hover state
            //     toggleEl.triggerEventHandler('mouseenter', null);
            //     fixture.detectChanges();

            //     // Assert
            //     fixture.whenStable().then(() => {
            //         expect(component.setCompleteHover).toHaveBeenCalled();
            //     });
            // }));

            // it(`'mouseleave' on 'checkbox.toggle' should call method 'setCompleteHover()' (async)`, async(() => {
            //     // Arrange

            //     // Act
            //     spyOn(component, 'setCompleteHover');

            //     // Set checkbox.toggle 'mouseleave' hover state
            //     toggleEl.triggerEventHandler('mouseleave', null);
            //     fixture.detectChanges();

            //     // Assert
            //     fixture.whenStable().then(() => {
            //         expect(component.setCompleteHover).toHaveBeenCalled();
            //     });
            // }));

            // it(`clicking on 'checkbox.toggle' should call method 'toggleTodoComplete()' event (async)`, async () => {
            //     // Arrange

            //     // Act
            //     spyOn(component, 'toggleTodoComplete');
            //     if (toggleEl instanceof HTMLElement) {
            //         toggleEl.click();
            //     } else {
            //         toggleEl.triggerEventHandler('click', { button: 0 });
            //     }

            //     // Assert
            //     fixture.whenStable().then(() => {
            //         expect(component.toggleTodoComplete).toHaveBeenCalled();
            //     });
            // });
        });
    });
});
