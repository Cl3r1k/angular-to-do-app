import { TestBed, inject } from '@angular/core/testing';

import { IndexedDbDexieService } from '@app/_services/indexed-db-dexie.service';

describe('IndexedDbDexieService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IndexedDbDexieService]
        });
    });

    it('should be created', inject([IndexedDbDexieService], (service: IndexedDbDexieService) => {
        expect(service).toBeTruthy();
    }));
});
