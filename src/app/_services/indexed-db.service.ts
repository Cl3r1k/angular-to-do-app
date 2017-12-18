import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { AngularIndexedDB } from 'angular2-indexeddb';

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
            case 1:    // addItem
                this.addItem();
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
            case 5:    // removeById
                this.removeById(2);
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

        console.log('db %s was initialised/connected.', this.baseName);

        this.db.openDatabase(1, (evt) => {
            const objectStore = evt.currentTarget.result.createObjectStore(
                this.storeName, { keyPath: 'id', autoIncrement: true }
            );

            objectStore.createIndex('title', 'title', { unique: false });
            objectStore.createIndex('complete', 'complete', { unique: false });

            console.log('Created %s with store %s (v%d)', this.baseName, this.storeName, 1);
        });
    }

    addItem() {
        const todo: ToDo = new ToDo({ title: 'Find some gold!', complete: false });
        this.db.add(this.storeName, todo).then(() => {
            console.log('addItem - added todo with title: %s', todo.title);
        }, (error) => {
            console.error('addItem error: ', error);
        });
    }

    finByTodoTitle(todoTitle: string) {
        this.db.getByIndex(this.storeName, 'title', todoTitle).then((todo) => {
            console.log('finByTodoTitle - todo result: ', todo);
        }, (error) => {
            console.error('finByTodoTitle error: ', error);
        });
    }

    finById(todoId: number) {
        this.db.getByKey(this.storeName, todoId).then((todo) => {
            console.log('finById - todo result: ' , todo);
        }, (error) => {
            console.error('finById error: ', error);
        });
    }

    updateById(todoId: number) {
        const todo: ToDo = new ToDo({ title: 'Find some gold! (updated)', complete: true });

        this.db.update(this.storeName, { title: todo.title, complete: todo.complete, id: todoId }).then(() => {
            console.log('updateById - updated value for item with id: ', todoId);
        }, (error) => {
            console.error('updateById error', error);
        });
    }

    removeById(todoId: number) {
        this.db.delete(this.storeName, todoId).then(() => {
            console.log('removeById - deleted value with id: ', todoId);
        }, (error) => {
            console.error('removeById error: ', error);
        });
    }

    getAll() {
        this.db.getAll(this.storeName).then((data) => {
            console.log('getAll - data: ', data);
        }, (error) => {
            console.error('getAll error: ', error);
        });
    }

    clearStore() {
        this.db.clear(this.storeName).then(() => {
            console.log('clearStore -> all items deleted');
        }, (error) => {
            console.error('clearStore error', error);
        });
    }

}
