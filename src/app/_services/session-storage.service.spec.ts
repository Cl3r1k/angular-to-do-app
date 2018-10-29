import { TestBed, inject } from '@angular/core/testing';

import { SessionStorageService } from '@app/_services/session-storage.service';

describe('Service: SessionStorageService', () => {

    let sessionStorageService: SessionStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SessionStorageService]
        });

        sessionStorageService = TestBed.get(SessionStorageService);
    });

    it('should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(sessionStorageService).toBeTruthy();
    });

    describe(`#destroy()`, () => {
        it(`should clear 'accessToken' and 'name'`, () => {
            // Arrange
            sessionStorageService.accessToken = 'Access.Token';
            sessionStorageService.name = 'Access.Name';

            // Act
            sessionStorageService.destroy();

            // Assert
            expect(sessionStorageService.accessToken).toEqual(null);
            expect(sessionStorageService.name).toEqual(null);
        });
    });

});
