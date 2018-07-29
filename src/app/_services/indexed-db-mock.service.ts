import { Injectable } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';
import { Tag } from '@app/_models/tag';

// Imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class IndexedDbMockService {

    constructor() { }

    public openIndexedDb(): Observable<null> {
        return Observable.of(null);
    }

    public createTodo(todo: ToDo): Observable<ToDo> {
        return Observable.of(
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        );
    }

    public getTodoById(todoId: number): Observable<ToDo> {
        return Observable.of(
            new ToDo({id: 1, title: 'Read article (IndexedDb)', complete: false })
        );
    }

    public getTodoByTitle(): Observable<ToDo> {
        return Observable.of(
            new ToDo({id: 1, title: 'Read article (IndexedDb)', complete: false })
        );
    }

    public getTodosAmountObject(): Observable<Object> {
        return Observable.of(
            { all: 5, active: 3, complete: 2 }
        );
    }

    public getAllTodos(): Observable<ToDo[]> {
        return Observable.of([
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        ]);
    }

    public updateTodo(todo: ToDo): Observable<ToDo> {
        return Observable.of(
            new ToDo({id: 1, title: 'Read article (IndexedDb)', complete: false })
        );
    }

    public toggleAll(): Observable<ToDo[]> {
        return Observable.of([
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        ]);
    }

    public deleteTodoById(todoid: number): Observable<null> {
        return Observable.of(null);
    }

    public clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        return Observable.of([
            new ToDo({ id: 1, title: 'Read article (IndexedDb)', complete: false })
        ]);
    }

    public clearStore(): Observable<null> {
        return Observable.of(null);
    }

    public getAllHashtags(): Observable<Tag[]> {
        return Observable.of([
            new Tag('tagName')
        ]);
    }

    public updateHashtags(tags: Tag[]): Observable<null> {
        return Observable.of(null);
    }

    public cleanHashtags(todos: ToDo[], hashtagsInDb: Tag[]): boolean {
        return true;
    }

}
