import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

// Models
import { ToDo } from '@app/_models/to-do';

// Services
import { SessionStorageService } from '@app/_services/session-storage.service';

// Imports
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

    consoleTextColorService = 'color: salmon;';

    constructor(private _httpClient: HttpClient, private _sessionStorage: SessionStorageService) { }

    public signIn(username: string, password: string) {
        return this._httpClient.post(API_URL + '/sign-in', { username, password }).pipe(
            map(response => {
                // console.error(`%cApiService::response `, this.consoleTextColorService, response);
                console.log('ApiService response: ', response);
                return response;
            }),
            catchError(this.handleError)
        );
    }

    // API: POST /todos
    public createTodo(todo: ToDo): Observable<ToDo> {
        const options = this.getRequestOptions();
        return this._httpClient.post(API_URL + '/todos', todo, options).pipe(
            map(response => {
                return new ToDo(response);
            }),
            catchError(this.handleError));
    }

    // API: GET /todos:id
    public getTodoById(todoId: number): Observable<ToDo> {
        const options = this.getRequestOptions();
        return this._httpClient.get(API_URL + '/todos/' + todoId, options).pipe(
            map(response => {
                return new ToDo(response);
            }),
            catchError(this.handleError));
    }

    // TODO: Refactor this code, and combine to one getTodosAmount
    // API: GET /todos (only active amount)
    public getActiveTodosAmount(): Observable<number> {
        const options = this.getRequestOptions();
        return this._httpClient.get(API_URL + '/todos', options).pipe(
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
        const options = this.getRequestOptions();
        return this._httpClient.get(API_URL + '/todos', options).pipe(
            map(response => {
                // console.log(Object.keys(response));
                return Object.keys(response).length;
            }),
            catchError(this.handleError));
    }

    // API: GET /todos (according to activeRouteState: 0 - All todos, 1 - only active, 2 - only completed)
    public getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        const options = this.getRequestOptions();
        return this._httpClient.get(API_URL + '/todos', options).pipe(
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
        const options = this.getRequestOptions();
        return this._httpClient.put(API_URL + '/todos/' + todo.id, todo, options).pipe(
            map(response => {
                return new ToDo(response);
            }),
            catchError(this.handleError));
    }

    // API: DELETE /todos:id
    public deleteTodoById(todoId: number): Observable<null> {
        const options = this.getRequestOptions();
        return this._httpClient.delete(API_URL + '/todos/' + todoId, options).pipe(
            map(response => null),
            catchError(this.handleError));
    }

    // API: PUT /todos (delete completed todos)
    public clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        const options = this.getRequestOptions();
        console.log(`%cThis part is under construction`, this.consoleTextColorService);

        return this._httpClient.get(API_URL + '/todos', options).pipe(
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

    getRequestOptions() {
        const httpOptions =  {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this._sessionStorage.accessToken
            })
        };

        return httpOptions;
    }

    private handleError(error: Response | any) {
        if (error._body.type === 'error') {
            console.log(`%cRequest failed... Is json-server running?`, this.consoleTextColorService);
        }
        console.error(`%cApiService::handleError`, this.consoleTextColorService, error);
        return observableThrowError(error);
    }

}
