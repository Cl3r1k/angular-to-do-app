import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { Observable } from 'rxjs/Observable';

import { ApiService } from '@app/_services/api.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';

@Injectable()
export class TodoService {

    serviceState = 1;

    // TODO: Use DI to define service
    constructor(private _api: ApiService, public _indexedDbService: IndexedDbService) {
        // Наверное нужно использовать приватную переменную типа Интерфейс, а также имплементировать интерфейс в сервисы
        // и уже в конструкторе в зависимости от состояния, использовать тот или иной сервис, но это не точно.
        console.log('constructor in TodoService');
    }

    // initIndexedDbBase(): Observable<null> {
    //     return this._indexedDbService.openIndexedDb();    // Init/Open base
    // }

    // ------ Testing part ------
    initIndexedDbBase(num: number): Observable<null> {
        return this._indexedDbService.openIndexedDb(num);    // Init/Open base
    }

    deleteObjectStore() {
        this._indexedDbService.deleteObjectStore();
    }
    // ----------------------------------------------------------------------------

    // Simulate POST /todos
    addTodo(todo: ToDo): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.createTodo(todo);
        } else {
            return this._api.createTodo(todo);
        }
    }

    // Simulate DELETE /todos/:id
    deleteTodoById(id: number): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.deleteTodoById(id);
        } else {
            return this._api.deleteTodoById(id);
        }
    }

    // Simulate PUT /todos/:id
    updateTodo(todo: ToDo): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.updateTodo(todo);
        } else {
            return this._api.updateTodo(todo);
        }
    }

    // Simulate GET /todos (according to activeRouteState: 0 - All todos, 1 - only active, 2 - only completed)
    getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        if (this.serviceState === 1) {
            return this._indexedDbService.getAllTodos(activeRouteState);
        } else {
            return this._api.getAllTodos(activeRouteState);
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

    // Toggle todo complete
    toggleTodoComplete(todo: ToDo): Observable<ToDo> {
        todo.complete = !todo.complete;

        if (this.serviceState === 1) {
            return this._indexedDbService.updateTodo(todo);
        } else {
            return this._api.updateTodo(todo);
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

    // Simulate clear Completed PUT /todos
    clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        if (this.serviceState === 1) {
            return this._indexedDbService.clearCompleted(activeRouteState);
        } else {
            return this._api.clearCompleted(activeRouteState);
        }
    }

    // Simulate Toggle all PUT /todos
    toggleAll(state: boolean): Observable<ToDo[]> {
        // return this._api.toggleAll(state);
        return this._indexedDbService.getAllTodos(0);
    }

}
