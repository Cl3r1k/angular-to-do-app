import { TestBed, inject } from '@angular/core/testing';

import { TagService } from '@app/_services/tag.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';

import { Utils } from '@app/_common/utils';

describe('TagService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TagService, Utils, IndexedDbService]
        });
    });

    it('should be created', inject([TagService], (service: TagService) => {
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'TagService' (currently not complete)
});
