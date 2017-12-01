import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { ApiService } from '@app/_services/api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

    // lastId = 0;  // Placeholder for last id so we can simulate automatic incrementing for id's
    // todos: ToDo[] = [];  // Array placeholder for todo's

    constructor(private _api: ApiService) { }

    // Simulate POST /todos
    addTodo(todo: ToDo): Observable<ToDo> {
        return this._api.createTodo(todo);
    }

    // Simulate DELETE /todos/:id
    deleteTodoById(id: number): Observable<ToDo> {
        return this._api.deleteTodoById(id);
    }

    // Simulate PUT /todos/:id
    updateTodo(todo: ToDo): Observable<ToDo> {
        return this._api.updateTodo(todo);
    }

    // Simulate GET /todos
    getAllTodos(): Observable<ToDo[]> {
        return this._api.getAllTodos();
    }

    // Simulate GET /todos (only active)
    getAllActiveTodos(): Observable<ToDo[]> {
        return this._api.getAllActiveTodos();
    }

    // Simulate GET /todos (only completed)
    getAllCompletedTodos(): Observable<ToDo[]> {
        return this._api.getAllCompletedTodos();
    }

    // Simulate GET /todos/:id
    getTodoById(id: number): Observable<ToDo> {
        return this._api.getTodoById(id);
    }

    // Toggle todo complete
    toggleTodoComplete(todo: ToDo) {
        todo.complete = !todo.complete;

        return this._api.updateTodo(todo);
    }
}
