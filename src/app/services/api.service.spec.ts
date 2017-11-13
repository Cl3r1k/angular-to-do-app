import { async, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToDo } from '@app/to-do';
import { environment } from '@env/environment';

import { ApiService } from '@app/services/api.service';

describe('ApiService', () => {

    let injector: TestBed;
    let service: ApiService;
    let httpMock: HttpTestingController;

    const API_URL = environment.apiUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        injector = getTestBed();
        service = injector.get(ApiService);
        httpMock = injector.get(HttpTestingController);
    });

    describe(`#getAllTodos`, () => {
        it(`should return an Observable<ToDo[]>`, async(() => {    // Declare as async test since the HttpClient works with Observables
            // Arrange
            const dummyTodos = [
                new ToDo({ id: 1, title: 'todo 1', complete: false}),
                new ToDo({ id: 2, title: 'todo 2', complete: true}),
            ];

            // Act
            service.getAllTodos().subscribe(todos => {
                expect(todos.length).toBe(2);
                expect(todos).toEqual(dummyTodos);
            });

            // Assert
            const req = httpMock.expectOne(API_URL + '/todos');
            expect(req.request.method).toBe('GET');
            req.flush(dummyTodos);
        }));
    });
});
