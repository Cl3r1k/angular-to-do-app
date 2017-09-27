import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Http,
                    useFactory: (backend, options) => {
                        return new Http(backend, options);
                    },
                    deps: [ MockBackend, BaseRequestOptions ]
                },
                MockBackend,
                BaseRequestOptions,
                ApiService
            ]
        });
    });

    it('should be created', inject([ApiService], (service: ApiService) => {
        expect(service).toBeTruthy();
    }));
});
