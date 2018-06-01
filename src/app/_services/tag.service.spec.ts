import { TestBed, inject } from '@angular/core/testing';

import { TagService } from '@app/_services/tag.service';

describe('TagService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TagService]
        });
    });

    it('should be created', inject([TagService], (service: TagService) => {
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'TagService' (currently not complete)
});
