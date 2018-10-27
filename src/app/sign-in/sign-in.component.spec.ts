import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
});
