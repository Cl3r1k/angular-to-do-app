import { Injectable } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

// Imports
import {of as observableOf,  Observable } from 'rxjs';

@Injectable()
export class ApiMockService {

    constructor() { }

    public signIn(username: string, password: string): Observable<string> {
        return observableOf(
            'Mocked.Tocken'
        );
    }

    public createTodo(todo: ToDo): Observable<ToDo> {
        return observableOf(
            new ToDo({ id: 1, title: 'Read article', complete: false })
        );
    }

    public getTodoById(todoId: number): Observable<ToDo> {
        return observableOf(
            new ToDo({ id: 1, title: 'Read article', complete: false })
        );
    }

    public getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        return observableOf([
            new ToDo({ id: 1, title: 'Read article', complete: false })
        ]);
    }

    public updateTodo(todo: ToDo): Observable<ToDo> {
        return observableOf(
            new ToDo({ id: 1, title: 'Read article', complete: false })
        );
    }

    public deleteTodoById(todoid: number): Observable<ToDo> {
        return null;
    }

    public clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        return observableOf([
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        ]);
    }

}
