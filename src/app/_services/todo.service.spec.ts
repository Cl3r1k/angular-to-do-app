import { TestBed, async, inject } from '@angular/core/testing';
import { ApiService } from '@app/_services/api.service';
import { ApiMockService } from '@app/_services/api-mock.service';

import { ToDo } from '@app/_models/to-do';
import { TodoService } from '@app/_services/todo.service';

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
