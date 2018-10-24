import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthService]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'AuthService' (currently not complete)
});
