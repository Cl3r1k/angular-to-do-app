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

        // How to upgrade DB version (http://dexie.org/docs/Tutorial/Design#database-versioning)
        this.version(1).stores({
            dbTable: '++id, title, complete'
        });
        this.dbTable.mapToClass(ToDo);
        console.log('%c Created/Inited %s (v%d)', this.consoleTextColor, this.name, 1);

        // This function runs once when base created (http://dexie.org/docs/Dexie/Dexie.on.populate#description)
        this.on('populate', () => {
            this.dbTable.add(new ToDo({ id: 1, title: 'Add more todos!', complete: false }));
            this.dbTable.add(new ToDo({ id: 2, title: 'Click on checkbox to make me done!', complete: false }));
            this.dbTable.add(new ToDo({ id: 3, title: 'Press on trash to delete me!', complete: false }));
            this.dbTable.add(new ToDo({ id: 4, title: 'Press on pen to edit me!', complete: false }));
            console.log('%c DB populated', this.consoleTextColor);
        });
    }

    public openIndexedDb() {
        this.open().then(() => {
            console.log('%c Opened %s successfully (v%d)', this.consoleTextColor, this.name, 1);
        }).catch(function (err) {
            console.error('Errod during opening database: ', err.stack || err);
        });

        // console.log('%cCreated %s with store %s (v%d)', this.consoleTextColor, this.baseName, this.storeName, 1);
        // this.dbTable = this.table(this.storeName);
    }

    public createTodo(todo: ToDo) {
        this.dbTable.add(todo).then((newTodo) => {
            console.log('%c createTodo - added new todo: ', this.consoleTextColor, newTodo);
        });
    }

    public getTodoById(todoId: number) {
        this.dbTable.get(todoId).then(todo => {
            console.log('%c getTodoById - todo result: ', this.consoleTextColor, todo);
        }).catch(error => {
            console.error(error);
        });
    }

    public getTodoByTitle(todoTitle: string) {
        this.dbTable.where('title').equalsIgnoreCase(todoTitle).toArray().then(todos => {
            console.log('%c getTodoByTitle - todos result: ', this.consoleTextColor, todos);
        }).catch(error => {
            console.error(error);
        });
    }

    public getAllTodos(activeRouteState: number) {

        // Observable.fromPromise(this._databaseService.people.toArray())    // Observabel example

        // try this http://dexie.org/docs/Collection/Collection.each()
        console.log('%c calling getAllTodos in IndexedDbDexieService', this.consoleTextColor);
        if (activeRouteState === 1 || activeRouteState === 2) {
            // As far equals() does not support boolean, query by 0 and 1 instead of false and true
            this.dbTable.where('complete').equals(1).toArray().then((todos) => {
                console.log('%c getAllTodos - with activeRouteState = %d todos: ', this.consoleTextColor, activeRouteState, todos);
            }).catch(error => {
                console.error(error);
            });
        } else {
            this.dbTable.toArray().then((todos) => {
                console.log('%c getAllTodos - todos: ', this.consoleTextColor, todos);
            }).catch(error => {
                console.error(error);
            });
        }
    }

    public updateTodo(todo: ToDo) {
        this.dbTable.update(todo.id, todo).then((newTodo) => {
            console.log('%c updateTodo - updated value for item: ', this.consoleTextColor, newTodo);
        });
    }

    // API: (toggle all todos complete status)
    public toggleAll(state: boolean, activeRouteState: number) {
        // Use primaryKeys for performance (http://dexie.org/docs/Collection/Collection.primaryKeys())
    }

    public deleteTodoById(todoId: number) {
        this.dbTable.delete(todoId).then(() => {
            console.log('%c deleteTodoById - deleted value with id: ', this.consoleTextColor, todoId);
        });
    }

    // API: (delete completed todos)
    public clearCompleted(activeRouteState: number) {
        // Use primaryKeys for performance (http://dexie.org/docs/Collection/Collection.primaryKeys())
    }

    public clearStore() {
        //
    }

}
