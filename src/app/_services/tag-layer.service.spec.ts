import { TestBed, inject } from '@angular/core/testing';

import { TagLayerService } from '@app/_services/tag-layer.service';

describe('Service: TagLayerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TagLayerService]
        });
    });

    it('should be created', inject([TagLayerService], (service: TagLayerService) => {
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'TagLayerService' (currently not complete)
});
