import { TestBed, inject } from '@angular/core/testing';

import { IndexedDbService } from '@app/_services/indexed-db.service';
import { Utils } from '@app/_common/utils';
import { TagLayerService } from '@app/_services/tag-layer.service';

describe('Service: IndexedDbService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IndexedDbService, Utils, TagLayerService]
        });
    });

    it('should be created', inject([IndexedDbService], (service: IndexedDbService) => {
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'IndexedDbService' (currently not complete)
});
