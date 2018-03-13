import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { Observable } from 'rxjs/Observable';

import { ApiService } from '@app/_services/api.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';

@Injectable()
export class TodoService {

    serviceState = 1;

    // TODO: Use only IndexedDbService, and sync data with backend
    constructor(private _api: ApiService, public _indexedDbService: IndexedDbService) {
        console.log('constructor in TodoService');
    }

    initIndexedDbBase(): Observable<null> {
        return this._indexedDbService.openIndexedDb();    // Init/Open base
    }

    // Simulate POST /todos
    addTodo(todo: ToDo): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.createTodo(todo);
        } else {
            return this._api.createTodo(todo);
        }
    }

    // Simulate GET /todos/:id
    getTodoById(id: number): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.getTodoById(id);
        } else {
            return this._api.getTodoById(id);
        }
    }

    // Simulate GET /todos (amount of active todos)
    getActiveTodosAmount(): Observable<number> {
        return this._api.getActiveTodosAmount();
    }

    // Simulate GET /todos (amount of all todos)
    getAllTodosAmount(): Observable<number> {
        return this._api.getAllTodosAmount();
    }

    getTodosAmountObject(): Observable<Object> {
        return this._indexedDbService.getTodosAmountObject();
    }

    // Simulate GET /todos (according to activeRouteState: 0 - All todos, 1 - only active, 2 - only completed)
    getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        if (this.serviceState === 1) {
            return this._indexedDbService.getAllTodos(activeRouteState);
        } else {
            return this._api.getAllTodos(activeRouteState);
        }
    }

    // Simulate PUT /todos/:id
    updateTodo(todo: ToDo): Observable<ToDo> {

        todo.updated_time = new Date().toISOString();

        if (this.serviceState === 1) {
            return this._indexedDbService.updateTodo(todo);
        } else {
            return this._api.updateTodo(todo);
        }
    }

    // Toggle todo complete
    toggleTodoComplete(todo: ToDo): Observable<ToDo> {
        todo.complete = !todo.complete;

        todo.complete ? todo.completed_time = new Date().toISOString() : todo.completed_time = null;

        return this.updateTodo(todo);
    }

    // Simulate Toggle all PUT /todos
    toggleAll(toggleState: boolean, activeRouteState: number): Observable<ToDo[]> {
        // return this._api.toggleAll(state);
        return this._indexedDbService.toggleAll(toggleState, activeRouteState);
    }

    // Simulate DELETE /todos/:id
    deleteTodoById(id: number): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.deleteTodoById(id);
        } else {
            return this._api.deleteTodoById(id);
        }
    }

    // Simulate clear Completed PUT /todos
    clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        if (this.serviceState === 1) {
            return this._indexedDbService.clearCompleted(activeRouteState);
        } else {
            return this._api.clearCompleted(activeRouteState);
        }
    }

    // Perform moveTodo in Service
    moveTodo(moveState: Object, activeRouteState: number): Observable<ToDo[]> {
        return this._indexedDbService.moveTodo(moveState, activeRouteState);
    }

}
