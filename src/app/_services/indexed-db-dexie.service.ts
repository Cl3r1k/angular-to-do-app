import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import Dexie from 'dexie';

@Injectable()
export class IndexedDbDexieService extends Dexie {

    storeName = 'todoTable';    // TODO: Delete this variable?
    dbTable: Dexie.Table<ToDo, number>;
    // ... other tables will go here... for more info look here (dexie.org/docs/Typescript)
    consoleTextColor = 'color: #5dc2af;';

    constructor() {
        super('todoDatabase');

        this.version(1).stores({
            dbTable: '++id, title, complete'
        });
        this.dbTable.mapToClass(ToDo);
        console.log('%cCreated/Inited %s (v%d)', this.consoleTextColor, this.name, 1);
    }

    public openIndexedDb() {
        this.open().then(() => {
            console.log('%cOpened %s successfully (v%d)', this.consoleTextColor, this.name, 1);
        }).catch(function (err) {
            console.error('Errod during opening database: ', err.stack || err);
        });

        // console.log('%cCreated %s with store %s (v%d)', this.consoleTextColor, this.baseName, this.storeName, 1);
        // this.dbTable = this.table(this.storeName);
    }

    public getAllTodos() {
        console.log('%ccalling getAllTodos in IndexedDbDexieService', this.consoleTextColor);
        this.dbTable.toArray().then((todos) => {
            console.log('todos: ', todos);
        });
    }

    public createTodo(todo: ToDo) {
        this.dbTable.add(todo).then((newTodo) => {
            console.log('%ccreateTodo - added new todo: ', this.consoleTextColor, newTodo);
        });
    }

    public updateTodo(todo: ToDo) {
        this.dbTable.update(todo.id, todo).then((newTodo) => {
            console.log('%cupdateTodo - updated value for item: ', this.consoleTextColor, newTodo);
        });
    }

    public deleteTodoById(todoId: number) {
        this.dbTable.delete(todoId).then(() => {
            console.log('%cdeleteTodoById - deleted value with id: ', this.consoleTextColor, todoId);
        });
    }

}
