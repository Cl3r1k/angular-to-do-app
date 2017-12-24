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

    // API: (delete completed todos)
    public clearCompleted(activeRouteState: number) {

        // Testing IndexedDb

        // switch (activeRouteState) {
        //     case 0:    // Init base
        //         this.openIndexedDb();
        //         break;
        //     case 1:    // addTodo
        //         // this.addTodo();
        //         break;
        //     case 2:    // finByTodoTitle
        //         this.finByTodoTitle('Find some gold!');
        //         break;
        //     case 3:    // finById
        //         this.finById(1);
        //         break;
        //     case 4:    // updateTodo
        //         this.updateTodo(new ToDo({ id: 1, title: 'Test todo!', complete: false }));
        //         break;
        //     case 5:    // deleteTodoById
        //         this.deleteTodoById(2);
        //         break;
        //     case 6:    // getAll
        //         this.getAll();
        //         break;
        //     case 7:    // clearStore
        //         this.clearStore();
        //         break;

        //     default:
        //         break;
        // }

    }

    openIndexedDb(): Observable<boolean> {
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
            return true;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    createTodo(todo: ToDo): Observable<ToDo> {
        return Observable.fromPromise(this.db.add(this.storeName, todo).then((newTodo) => {
            console.log('createTodo - added new todo: ', newTodo);
            return new ToDo({ id: newTodo.key, title: newTodo.value.title, complete: newTodo.value.complete });
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    finByTodoTitle(todoTitle: string) {
        this.db.getByIndex(this.storeName, 'title', todoTitle).then((todo) => {
            console.log('finByTodoTitle - todo result: ', todo);
        }, (error) => {
            this.handleError(error);
        });
    }

    finById(todoId: number) {
        this.db.getByKey(this.storeName, todoId).then((todo) => {
            console.log('finById - todo result: ', todo);
        }, (error) => {
            this.handleError(error);
        });
    }

    updateTodo(todo: ToDo): Observable<ToDo> {
        return Observable.fromPromise(this.db.update(this.storeName, todo).then((newTodo) => {
            console.log('updateTodo - updated value for item with id: %d, and title: %s', newTodo.id, newTodo.title);
            return newTodo;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    deleteTodoById(todoId: number): Observable<null> {
        return Observable.fromPromise(this.db.delete(this.storeName, todoId).then(() => {
            console.log('deleteTodoById - deleted value with id: ', todoId);
            return null;
        }, (error) => {
            this.handleError(error);
        })
        );
    }

    // API: GET /todos (according to activeRouteState: 0 - All todos, 1 - only active, 2 - only completed)
    getAllTodos(activeRouteState: number): Observable<ToDo[]> {
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

    clearStore() {
        this.db.clear(this.storeName).then(() => {
            console.log('clearStore -> all items deleted');
        }, (error) => {
            this.handleError(error);
        });
    }

    private handleError(error: Event | any) {
        console.error('IndexedDbService - handleError: ', error);
        return Observable.throw(error);
    }

}
