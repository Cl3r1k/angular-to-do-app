import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { ApiService } from '@app/_services/api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

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

    // Simulate GET /todos (according to activeRouteState: 0 - All todos, 1 - only active, 2 - only completed)
    getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        return this._api.getAllTodos(activeRouteState);
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

    // Simulate GET /todos (amount of active todos)
    getActiveTodosAmount(): Observable<number> {
        return this._api.getActiveTodosAmount();
    }

    // Simulate GET /todos (amount of all todos)
    getAllTodosAmount(): Observable<number> {
        return this._api.getAllTodosAmount();
    }

    clearCompleted(activeRouteState: number) {
        return this._api.clearCompleted(activeRouteState);
    }
}
