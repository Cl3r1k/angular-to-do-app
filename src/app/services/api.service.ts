import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ToDo } from '@app/to-do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

    constructor(private _httpClient: HttpClient) { }

    // API: GET /todos
    public getAllTodos(): Observable<ToDo[]> {
        return this._httpClient.get(API_URL + '/todos')
            .map(response => response)
            .catch(this.handleError);
    }

    // API: POST /todos
    public createTodo(todo: ToDo): Observable<ToDo> {
        return this._httpClient.post(API_URL + '/todos', todo)
            .map(response => {
                return new ToDo(response);
            })
            .catch(this.handleError);
    }

    // API: GET /todos:id
    public getTodoById(todoId: number): Observable<ToDo> {
        return this._httpClient.get(API_URL + '/todos/' + todoId)
            .map(response => {
                return new ToDo(response);
            })
            .catch(this.handleError);
    }

    // API: PUT /todos
    public updateTodo(todo: ToDo): Observable<ToDo> {
        return this._httpClient.put(API_URL + '/todos/' + todo.id, todo)
            .map(response => {
                return new ToDo(response);
            })
            .catch(this.handleError);
    }

    // API: DELETE /todos:id
    public deleteTodoById(todoId: number): Observable<null> {
        return this._httpClient.delete(API_URL + '/todos/' + todoId)
            .map(response => null)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        if (error._body.type === 'error') {
            console.log('Request failed... Is json-server running?');
        }
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }

}
