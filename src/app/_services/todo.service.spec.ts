import { TestBed, async, inject } from '@angular/core/testing';
import { ToDo } from '@app/_models/to-do';

// Services
import { TodoService } from '@app/_services/todo.service';
import { ApiService } from '@app/_services/api.service';
import { ApiMockService } from '@app/_services/api-mock.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';
import { IndexedDbMockService } from '@app/_services/indexed-db-mock.service';
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';

describe('TodoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TodoService,
                {
                    provide: ApiService,
                    useClass: ApiMockService
                },
                {
                    provide: IndexedDbService,
                    useClass: IndexedDbMockService
                },
                {
                    provide: TodoOrderService,
                    useClass: TodoOrderMockService
                }
            ]
        });
    });

    it('Should be created', inject([TodoService], (service: TodoService) => {
        expect(service).toBeTruthy();
    }));

    // TODO: Rewrite test for 'TodoService' (currently not complete)
});
