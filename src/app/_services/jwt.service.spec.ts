import { TestBed } from '@angular/core/testing';

// Services
import { JwtService } from './jwt.service';

describe('Service: JwtService', () => {

    let service: JwtService;
    let store = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            //
        });

        service = TestBed.get(JwtService);

        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
            removeItem: (key: string) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            }
        };

        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
        spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    });

    it('should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    });

    describe(`saveToken()`, () => {
        it(`should store the token in localStorage`, () => {
            // Arrange

            // Act
            service.saveToken('Some.Token');

            // Assert
            expect(localStorage.getItem('jwtToken')).toEqual('Some.Token');
        });
    });

    describe(`getToken()`, () => {
        it(`should return stored token from localStorage`, () => {
            // Arrange

            // Act
            service.saveToken('Another.Token');

            // Assert
            expect(localStorage.getItem('jwtToken')).toEqual('Another.Token');
        });

        it(`should return 'null' from localStorage when there is no token`, () => {
            // Arrange

            // Act
            service.destroyToken();

            // Assert
            expect(localStorage.getItem('jwtToken')).toEqual(null);
        });
    });

    describe(`destroyToken()`, () => {
        it(`should remove previously stored token in localStorage`, () => {
            // Arrange

            // Act
            service.saveToken('ToDelete.Token');

            // Assert
            expect(localStorage.getItem('jwtToken')).toEqual('ToDelete.Token');
            service.destroyToken();
            expect(localStorage.getItem('jwtToken')).toEqual(null);
        });
    });

});
