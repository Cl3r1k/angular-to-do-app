import { Injectable } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';
import { Tag } from '@app/_models/tag';

// Imports
import {of as observableOf,  Observable } from 'rxjs';

@Injectable()
export class IndexedDbMockService {

    constructor() { }

    public openIndexedDb(): Observable<null> {
        return observableOf(null);
    }

    public createTodo(todo: ToDo): Observable<ToDo> {
        return observableOf(
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        );
    }

    public getTodoById(todoId: number): Observable<ToDo> {
        return observableOf(
            new ToDo({id: 1, title: 'Read article (IndexedDb)', complete: false })
        );
    }

    public getTodoByTitle(): Observable<ToDo> {
        return observableOf(
            new ToDo({id: 1, title: 'Read article (IndexedDb)', complete: false })
        );
    }

    public getTodosAmountObject(): Observable<Object> {
        return observableOf(
            { all: 5, active: 3, complete: 2 }
        );
    }

    public getAllTodos(): Observable<ToDo[]> {
        return observableOf([
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        ]);
    }

    public updateTodo(todo: ToDo): Observable<ToDo> {
        return observableOf(
            new ToDo({id: 1, title: 'Read article (IndexedDb)', complete: false })
        );
    }

    public toggleAll(): Observable<ToDo[]> {
        return observableOf([
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        ]);
    }

    public deleteTodoById(todoid: number): Observable<null> {
        return observableOf(null);
    }

    public clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        return observableOf([
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        ]);
    }

    public clearStore(): Observable<null> {
        return observableOf(null);
    }

    public getAllHashtags(): Observable<Tag[]> {
        return observableOf([
            new Tag('tagName')
        ]);
    }

    public updateHashtags(tags: Tag[]): Observable<null> {
        return observableOf(null);
    }

    public cleanHashtags(todos: ToDo[], hashtagsInDb: Tag[]): boolean {
        return true;
    }

}
