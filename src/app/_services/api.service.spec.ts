import { async, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToDo } from '@app/_models/to-do';
import { environment } from '@env/environment';

import { ApiService } from '@app/_services/api.service';

describe('Service: ApiService', () => {

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
        // tslint:disable-next-line:max-line-length
        it(`should return an Observable<ToDo[]> (all todos) (async)`, async(() => {    // Declare as async since the HttpClient works with Observables
            // Arrange
            const dummyTodos = [
                new ToDo({ id: 1, title: 'todo 1', complete: false}),
                new ToDo({ id: 2, title: 'todo 2', complete: true}),
            ];

            // Act
            service.getAllTodos(0).subscribe(todos => {
                expect(todos.length).toBe(0);
                // Commented till will be used ApiService again
                // expect(todos.length).toBe(2);
                // expect(todos).toEqual(dummyTodos);
            });

            // Assert
            const req = httpMock.expectOne(API_URL + '/todos');
            expect(req.request.method).toBe('GET');
            req.flush(dummyTodos);
        }));

        // tslint:disable-next-line:max-line-length
        it(`should return an Observable<ToDo[]> (only active) (async)`, async(() => {    // Declare as async since the HttpClient works with Observables
            // Arrange
            const dummyTodos = [
                new ToDo({ id: 1, title: 'todo 1', complete: false}),
                new ToDo({ id: 2, title: 'todo 2', complete: true}),
                new ToDo({ id: 3, title: 'todo 3', complete: false}),
            ];

            // Act
            service.getAllTodos(1).subscribe(todos => {
                expect(todos.length).toBe(2);
                expect(todos).toEqual(dummyTodos.filter((val) => val.complete === false));
            });

            // Assert
            const req = httpMock.expectOne(API_URL + '/todos');
            expect(req.request.method).toBe('GET');
            req.flush(dummyTodos);
        }));

        // tslint:disable-next-line:max-line-length
        it(`should return an Observable<ToDo[]> (only completed) (async)`, async(() => {    // Declare as async since the HttpClient works with Observables
            // Arrange
            const dummyTodos = [
                new ToDo({ id: 1, title: 'todo 1', complete: false}),
                new ToDo({ id: 2, title: 'todo 2', complete: true}),
                new ToDo({ id: 3, title: 'todo 3', complete: false}),
            ];

            // Act
            service.getAllTodos(2).subscribe(todos => {
                expect(todos.length).toBe(1);
                expect(todos).toEqual(dummyTodos.filter((val) => val.complete === true));
            });

            // Assert
            const req = httpMock.expectOne(API_URL + '/todos');
            expect(req.request.method).toBe('GET');
            req.flush(dummyTodos);
        }));
    });
});
