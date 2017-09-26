import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToDo } from './to-do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

    constructor(private _http: Http) { }

    // API: GET /todos
    public getAllTodos(): Observable<ToDo[]> {
        return this._http.get(API_URL + '/todos')
            .map(response => {
                const todos = response.json();
                return todos.map((todo) => new ToDo(todo));
            })
            .catch(this.handleError);
    }

    // API: POST /todos
    public createTodo(todo: ToDo): Observable<ToDo> {
        return this._http.post(API_URL + '/todos', todo)
            .map(response => {
                return new ToDo(response.json());
            })
            .catch(this.handleError);
    }

    // API: GET /todos:id
    public getTodoById(todoId: number): Observable<ToDo> {
        return this._http.get(API_URL + '/todos/' + todoId)
            .map(response => {
                return new ToDo(response.json());
            })
            .catch(this.handleError);
    }

    // API: PUT /todos
    public updateTodo(todo: ToDo): Observable<ToDo> {
        return this._http.put(API_URL + '/todos/' + todo.id, todo)
            .map(response => {
                return new ToDo(response.json());
            })
            .catch(this.handleError);
    }

    // API: DELETE /todos:id
    public deleteTodoById(todoId: number): Observable<null> {
        return this._http.delete(API_URL + '/todos/' + todoId)
            .map(response => null)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }

}
