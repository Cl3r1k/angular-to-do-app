import { TestBed, async, inject } from '@angular/core/testing';
import { ApiService } from '@app/services/api.service';
import { ApiMockService } from '@app/services/api-mock.service';

import { ToDo } from '@app/to-do';
import { TodoService } from '@app/services/todo.service';

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
