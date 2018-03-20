import { TestBed, inject } from '@angular/core/testing';

import { IndexedDbService } from '@app/_services/indexed-db.service';

describe('IndexedDbService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IndexedDbService]
        });
    });

    it('should be created', inject([IndexedDbService], (service: IndexedDbService) => {
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'IndexedDbService' (currently not complete)
});
