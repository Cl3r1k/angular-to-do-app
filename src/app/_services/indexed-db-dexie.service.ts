import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import Dexie from 'dexie';

export interface ITodo {
    id: number;
    title: string;
    complete: boolean;
}

@Injectable()
export class IndexedDbDexieService extends Dexie {

    baseName = 'todoDatabase';
    storeName = 'todoStore';
    dbTable: Dexie.Table<ITodo, number>;

    constructor() {
        super('todoDatabase');

        this.version(1).stores({
            todos: '++id, title, complete'
        });
    }

    public openIndexedDb() {
        console.log('Created %s with store %s (v%d)', this.baseName, this.storeName, 1);
        this.dbTable = this.table(this.storeName);
    }

    public getAllTodos() {
        console.log('calling getAllTodos in IndexedDbDexieService');
        this.dbTable.toArray().then((todos) => {
            console.log('todos: ', todos);
        });
    }

    public createTodo(todo: ToDo) {
        this.dbTable.add(todo).then((newTodo) => {
            console.log('createTodo - added new todo: ', newTodo);
        });
    }

    public updateTodo(todo: ToDo) {
        this.dbTable.update(todo.id, todo).then((newTodo) => {
            console.log('updateTodo - updated value for item: ', newTodo);
        });
    }

    public deleteTodoById(todoId: number) {
        this.dbTable.delete(todoId).then(() => {
            console.log('deleteTodoById - deleted value with id: ', todoId);
        });
    }

}
