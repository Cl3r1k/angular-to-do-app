import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { ToDo } from '@app/_models/to-do';

import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

    consoleTextColorService = 'color: salmon;';

    constructor(private _httpClient: HttpClient) { }

    // API: POST /todos
    public createTodo(todo: ToDo): Observable<ToDo> {
        return this._httpClient.post(API_URL + '/todos', todo).pipe(
            map(response => {
                return new ToDo(response);
            }),
            catchError(this.handleError));
    }

    // API: GET /todos:id
    public getTodoById(todoId: number): Observable<ToDo> {
        return this._httpClient.get(API_URL + '/todos/' + todoId).pipe(
            map(response => {
                return new ToDo(response);
            }),
            catchError(this.handleError));
    }

    // TODO: Refactor this code, and combine to one getTodosAmount
    // API: GET /todos (only active amount)
    public getActiveTodosAmount(): Observable<number> {
        return this._httpClient.get(API_URL + '/todos').pipe(
            map(response => {
                const todos: ToDo[] = [];
                // console.log(response[0]);

                Object.keys(response).forEach(key => {
                    if (!response[key].complete) {
                        todos.push(new ToDo({ id: response[key].id, title: response[key].title, complete: response[key].complete }));
                    }
                });

                return todos.length;
            }),
            catchError(this.handleError));
    }

    // API: GET /todos (all todos amount)
    public getAllTodosAmount(): Observable<number> {
        return this._httpClient.get(API_URL + '/todos').pipe(
            map(response => {
                // console.log(Object.keys(response));
                return Object.keys(response).length;
            }),
            catchError(this.handleError));
    }

    // API: GET /todos (according to activeRouteState: 0 - All todos, 1 - only active, 2 - only completed)
    public getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        return this._httpClient.get(API_URL + '/todos').pipe(
            map(response => {
                const todos: ToDo[] = [];

                if (activeRouteState === 1 || activeRouteState === 2) {

                    Object.keys(response).forEach(key => {
                        if ((activeRouteState === 1 && !response[key].complete) || (activeRouteState === 2 && response[key].complete)) {
                            const tmpTodo = new ToDo({id: response[key].id, title: response[key].title, complete: response[key].complete});
                            tmpTodo.created_time = response[key].created_time;
                            tmpTodo.completed_time = response[key].completed_time;
                            tmpTodo.updated_time = response[key].updated_time;
                            tmpTodo.deleted_time = response[key].deleted_time;
                            tmpTodo.inner_id = response[key].inner_id;
                            todos.push(tmpTodo);
                        }
                    });

                    return todos;
                } else {
                    // return response;    // Original code, was commented cause of the error, fix it later
                    return todos;
                }
            }),
            catchError(this.handleError));
    }

    // API: PUT /todos
    public updateTodo(todo: ToDo): Observable<ToDo> {
        return this._httpClient.put(API_URL + '/todos/' + todo.id, todo).pipe(
            map(response => {
                return new ToDo(response);
            }),
            catchError(this.handleError));
    }

    // API: DELETE /todos:id
    public deleteTodoById(todoId: number): Observable<null> {
        return this._httpClient.delete(API_URL + '/todos/' + todoId).pipe(
            map(response => null),
            catchError(this.handleError));
    }

    // API: PUT /todos (delete completed todos)
    public clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        console.log(`%cThis part is under construction`, this.consoleTextColorService);

        return this._httpClient.get(API_URL + '/todos').pipe(
            map(response => {
                const todos: ToDo[] = [];

                if (activeRouteState === 1 || activeRouteState === 2) {

                    Object.keys(response).forEach(key => {
                        if ((activeRouteState === 1 && !response[key].complete) || (activeRouteState === 2 && response[key].complete)) {
                            todos.push(new ToDo({ id: response[key].id, title: response[key].title, complete: response[key].complete }));
                        }
                    });

                    return todos;
                } else {
                    // return response;    // Original code, was commented cause of the error, fix it later
                    return todos;
                }
            }),
            catchError(this.handleError));
    }

    private handleError(error: Response | any) {
        if (error._body.type === 'error') {
            console.log(`%cRequest failed... Is json-server running?`, this.consoleTextColorService);
        }
        console.error(`%cApiService::handleError`, this.consoleTextColorService, error);
        return observableThrowError(error);
    }

}
