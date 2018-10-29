import { TestBed, inject } from '@angular/core/testing';

import { TagService } from '@app/_services/tag.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';
import { TagLayerService } from '@app/_services/tag-layer.service';

import { Utils } from '@app/_common/utils';

describe('Service: TagService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TagService, Utils, IndexedDbService, TagLayerService]
        });
    });

    it('should be created', inject([TagService], (service: TagService) => {
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'TagService' (currently not complete)
});
