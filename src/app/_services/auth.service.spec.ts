import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthService } from './auth.service';
import { SessionStorageService } from '@app/_services/session-storage.service';
import { JwtService } from '@app/_services/jwt.service';

describe('Service: AuthService', () => {

    let service: AuthService;
    let sessionStorageService: SessionStorageService;
    let jwtService: JwtService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthService, SessionStorageService]
        });

        service = TestBed.get(AuthService);
        sessionStorageService = TestBed.get(SessionStorageService);
        jwtService = TestBed.get(JwtService);

        const mockJWTService = {
            getToken: (): string => {
                return 'JWT.Token';
            }
        };

        spyOn(jwtService, 'getToken').and.callFake(mockJWTService.getToken);
    });

    it('should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    });

    describe(`#isSignedIn()`, () => {
        it(`should return false(accessToken) for unauthorized user`, () => {
            // Arrange

            // Act

            // Assert
            expect(service.isSignedIn()).toEqual(false);
        });

        it(`should return true(accessToken) for authorized user`, () => {
            // Arrange

            // Act
            service.doSignIn('Access.Token', 'UserName'); // Imitate login

            // Assert
            expect(service.isSignedIn()).toEqual(true);
            service.doSignOut(); // Imitate logout
        });
    });

    describe(`#doSignOut()`, () => {
        it(`should call method 'purgeAuth()' and 'sessionStorageService.destroy()'`, () => {
            // Arrange

            // Act
            spyOn(service, 'purgeAuth');
            spyOn(sessionStorageService, 'destroy');
            service.doSignOut();

            // Assert
            expect(service.purgeAuth).toHaveBeenCalled();
            expect(sessionStorageService.destroy).toHaveBeenCalled();
        });
    });

    describe(`#doSignIn()`, () => {
        it(`should call method 'setAuth()' and set auth.data in sessionStorageService`, () => {
            // Arrange

            // Act
            spyOn(service, 'setAuth');
            service.doSignIn('SignIn.Token', 'SignIn.Name');

            // Assert
            expect(service.setAuth).toHaveBeenCalled();
            expect(sessionStorageService.accessToken).toEqual('SignIn.Token');
            expect(sessionStorageService.name).toEqual('SignIn.Name');
        });
    });

    describe(`#setAuth()`, () => {
        it(`should call method 'jwtService.saveToken()'`, () => {
            // Arrange

            // Act
            spyOn(jwtService, 'saveToken');
            service.setAuth('setAuth.Token');

            // Assert
            expect(jwtService.saveToken).toHaveBeenCalled();
        });
    });

    describe(`#populate()`, () => {
        it(`should call method 'doSignIn()' if token is present`, () => {
            // Arrange

            // Act
            spyOn(service, 'doSignIn');
            service.populate();

            // Assert
            expect(service.doSignIn).toHaveBeenCalled();
        });
    });

    describe(`#purgeAuth()`, () => {
        it(`should call method 'jwtService.destroyToken()'`, () => {
            // Arrange

            // Act
            spyOn(jwtService, 'destroyToken');
            service.purgeAuth();

            // Assert
            expect(jwtService.destroyToken).toHaveBeenCalled();
        });
    });

});
