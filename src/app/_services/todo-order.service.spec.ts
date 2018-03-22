import { TestBed, inject } from '@angular/core/testing';

import { TodoOrderService } from '@app/_services/todo-order.service';

describe('TodoOrderService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TodoOrderService]
        });
    });

    it('should be created', inject([TodoOrderService], (service: TodoOrderService) => {
        expect(service).toBeTruthy();
    }));
});
