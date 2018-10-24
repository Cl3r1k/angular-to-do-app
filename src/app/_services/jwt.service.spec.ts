import { async, getTestBed, TestBed } from '@angular/core/testing';

import { JwtService } from './jwt.service';

class JwtMockService {
    getToken() {
        return 'Mocked.Token';
    }
}

describe('JwtService', () => {

    let injector: TestBed;
    let service: JwtService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: JwtService,
                    useClass: JwtMockService
                }
            ]
        });

        // service = TestBed.get(JwtService);
        injector = getTestBed();
        service = injector.get(JwtService);
    });

    it('should be created (mocked)', () => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    });

    it('should return token (mocked)', () => {
        // Arrange

        // Act

        // Assert
        expect(service.getToken()).toEqual('tst');
    });

    // TODO: Rewrite test for 'JwtService' (currently not complete)
});
