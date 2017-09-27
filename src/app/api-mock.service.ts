import { Injectable } from '@angular/core';
import { ToDo } from './to-do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiMockService {

    constructor() { }

    public getAllTodos(): Observable<ToDo[]> {
        return Observable.of([
            new ToDo({ id: 1, title: 'Read article', complete: false })
        ]);
    }

    public createTodo(todo: ToDo): Observable<ToDo> {
        return Observable.of(
            new ToDo({ id: 1, title: 'Read article', complete: false })
        );
    }

    public getTodoById(todoId: number): Observable<ToDo> {
        return Observable.of(
            new ToDo({id: 1, title: 'Read article', complete: false })
        );
    }

    public updateTodo(todo: ToDo): Observable<ToDo> {
        return Observable.of(
            new ToDo({id: 1, title: 'Read article', complete: false })
        );
    }

    public deleteTodoById(todoid: number): Observable<ToDo> {
        return null;
    }

}
