import { environment } from '../../environments/environment';
import { ToDo } from './../to-do';
// import { MockBackend } from '@angular/http/testing';
// import { BaseRequestOptions, Http } from '@angular/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {

    let injector: TestBed;
    let service: ApiService;
    let httpMock: HttpTestingController;

    const API_URL = environment.apiUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpTestingController, ApiService]
        });

        injector = getTestBed();
        service = injector.get(ApiService);
        httpMock = injector.get(HttpTestingController);
    });

    describe(`#getAllTodos`, () => {
        it(`should return an Observable<ToDo[]>`, () => {
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
        });
    });
});
