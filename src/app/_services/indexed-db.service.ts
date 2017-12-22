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

        switch (activeRouteState) {
            case 0:    // Init base
                this.openIndexedDb();
                break;
            case 1:    // addTodo
                // this.addTodo();
                break;
            case 2:    // finByTodoTitle
                this.finByTodoTitle('Find some gold!');
                break;
            case 3:    // finById
                this.finById(1);
                break;
            case 4:    // updateById
                this.updateById(2);
                break;
            case 5:    // deleteTodoById
                this.deleteTodoById(2);
                break;
            case 6:    // getAll
                this.getAll();
                break;
            case 7:    // clearStore
                this.clearStore();
                break;

            default:
                break;
        }

    }

    openIndexedDb() {
        this.db = new AngularIndexedDB(this.baseName, 1);

        console.log('IndexedDb %s was initialised/opened.', this.baseName);

        this.db.openDatabase(1, (evt) => {
            const objectStore = evt.currentTarget.result.createObjectStore(
                this.storeName, { keyPath: 'id', autoIncrement: true }
            );

            objectStore.createIndex('title', 'title', { unique: false });
            objectStore.createIndex('complete', 'complete', { unique: false });

            console.log('Created %s with store %s (v%d)', this.baseName, this.storeName, 1);
        });
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

    updateById(todoId: number) {
        const todo: ToDo = new ToDo({ title: 'Find some gold! (updated)', complete: true });

        this.db.update(this.storeName, { title: todo.title, complete: todo.complete, id: todoId }).then(() => {
            console.log('updateById - updated value for item with id: ', todoId);
        }, (error) => {
            this.handleError(error);
        });
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

    getAll() {
        this.db.getAll(this.storeName).then((data) => {
            console.log('getAll - data: ', data);
        }, (error) => {
            this.handleError(error);
        });
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
