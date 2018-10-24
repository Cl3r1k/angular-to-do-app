import { TestBed, inject } from '@angular/core/testing';

import { SessionStorageService } from '@app/_services/session-storage.service';

describe('SessionStorageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SessionStorageService]
        });
    });

    it('should be created', inject([SessionStorageService], (service: SessionStorageService) => {
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'SessionStorageService' (currently not complete)
});
