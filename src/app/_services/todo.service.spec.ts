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

describe('Service: TodoService', () => {
    let todo1;
    let todo2;
    let todo3;
    let expectedTodos: ToDo[];

    beforeEach(async(() => {
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
    }));

    beforeEach(() => {
        todo1 = new ToDo({ id: 1, title: 'Test 1', complete: false });
        todo2 = new ToDo({ id: 2, title: 'Test 2', complete: true });
        todo3 = new ToDo({ id: 3, title: 'Test 3', complete: false });

        todo1.inner_id = '1b14d11e-6c0d-44f0-a3e0-5804f217c6fc';
        todo2.inner_id = '812545db-2c17-4e19-a2c2-3165fc0dec36';
        todo3.inner_id = 'fae2f374-f5aa-46f9-90ec-c6b9d95fa368';
        expectedTodos = [todo1, todo2, todo3];
    });

    it(`Should be created`, inject([TodoService], (service: TodoService) => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    }));

    describe(`#sortListByOrder`, () => {
        it(`should return ordered list`, inject([TodoService], (service: TodoService) => {
            // Arrange
            const todoOrderList = [
                'fae2f374-f5aa-46f9-90ec-c6b9d95fa368',
                '1b14d11e-6c0d-44f0-a3e0-5804f217c6fc',
                '812545db-2c17-4e19-a2c2-3165fc0dec36'];

            // Act
            const resultTodos = service.sortListByOrder(expectedTodos, todoOrderList);

            // Assert
            expect(resultTodos).toEqual([todo3, todo1, todo2]);
        }));
    });

    // TODO: Rewrite test for 'TodoService' (currently not complete)
});
