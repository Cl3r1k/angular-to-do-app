import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { Observable } from 'rxjs/Observable';

import { AngularIndexedDB } from 'angular2-indexeddb';

import 'rxjs/add/observable/fromPromise';

@Injectable()
export class IndexedDbService {
    baseName = 'todoDb';
    storeName = 'todoStore';
    db;

    constructor() { }

    public openIndexedDb(): Observable<null> {
        this.db = new AngularIndexedDB(this.baseName, 1);

        console.log('IndexedDb %s was initialised/opened.', this.baseName);

        return Observable.fromPromise(this.db.openDatabase(1, (evt) => {
            const objectStore = evt.currentTarget.result.createObjectStore(
                this.storeName, { keyPath: 'id', autoIncrement: true }
            );

            objectStore.createIndex('title', 'title', { unique: false });
            objectStore.createIndex('complete', 'complete', { unique: false });

            console.log('Created %s with store %s (v%d)', this.baseName, this.storeName, 1);
        }).then(() => {
            console.log('DB INITED');
            return null;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    public createTodo(todo: ToDo): Observable<ToDo> {
        return Observable.fromPromise(this.db.add(this.storeName, todo).then((newTodo) => {
            console.log('createTodo - added new todo: ', newTodo);
            return new ToDo({ id: newTodo.key, title: newTodo.value.title, complete: newTodo.value.complete });
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    public getTodoByTitle(todoTitle: string): Observable<ToDo> {
        return Observable.fromPromise(this.db.getByIndex(this.storeName, 'title', todoTitle).then((todo) => {
            console.log('finByTodoTitle - todo result: ', todo);
            return todo;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    public getTodoById(todoId: number): Observable<ToDo> {
        return Observable.fromPromise(this.db.getByKey(this.storeName, todoId).then((todo) => {
            console.log('finById - todo result: ', todo);
            return todo;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    public updateTodo(todo: ToDo): Observable<ToDo> {
        return Observable.fromPromise(this.db.update(this.storeName, todo).then((newTodo) => {
            console.log('updateTodo - updated value for item with id: %d, and title: %s', newTodo.id, newTodo.title);
            return newTodo;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    public deleteTodoById(todoId: number): Observable<null> {
        return Observable.fromPromise(this.db.delete(this.storeName, todoId).then(() => {
            console.log('deleteTodoById - deleted value with id: ', todoId);
            return null;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    // API: GET /todos (according to activeRouteState: 0 - All todos, 1 - only active, 2 - only completed)
    public getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        console.log('calling getAllTodos in IndexedDbService');
        return Observable.fromPromise(this.db.getAll(this.storeName).then((response) => {
            console.log('getAllTodos - response: ', response);

            if (activeRouteState === 1 || activeRouteState === 2) {
                const todos: ToDo[] = [];

                Object.keys(response).forEach(key => {
                    if ((activeRouteState === 1 && !response[key].complete) || (activeRouteState === 2 && response[key].complete)) {
                        todos.push(new ToDo({ id: response[key].id, title: response[key].title, complete: response[key].complete }));
                    }
                });

                return todos;
            } else {
                return response;
            }
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    public clearStore(): Observable<null> {
        return Observable.fromPromise(this.db.clear(this.storeName).then(() => {
            console.log('clearStore -> all items deleted');
            return null;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    // API: (delete completed todos)
    public clearCompleted(activeRouteState: number): Observable<ToDo[]> {

        return Observable.fromPromise(this.db.deleteByIndexValue(this.storeName, 'complete', true).then((response) => {
            console.log('clearCompleted - response: ', response);

            if (activeRouteState === 1 || activeRouteState === 2) {
                const todos: ToDo[] = [];

                Object.keys(response).forEach(key => {
                    if ((activeRouteState === 1 && !response[key].complete) || (activeRouteState === 2 && response[key].complete)) {
                        todos.push(new ToDo({ id: response[key].id, title: response[key].title, complete: response[key].complete }));
                    }
                });

                return todos;
            } else {
                return response;
            }
        }, (error) => {
            this.handleError(error);
        })
        );

    }

    private handleError(error: Event | any) {
        console.error('IndexedDbService - handleError: ', error);
        return Observable.throw(error);
    }

}
