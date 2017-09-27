import { TestBed, async, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { ApiMockService } from './api-mock.service';

import { ToDo } from './to-do';
import { TodoService } from './todo.service';

describe('TodoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TodoService,
                {
                    provide: ApiService,
                    useClass: ApiMockService
                }
            ]
        });
    });

    it('Should be created', inject([TodoService], (service: TodoService) => {
        expect(service).toBeTruthy();
    }));
});
