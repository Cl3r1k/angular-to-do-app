import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { Observable } from 'rxjs/Observable';

import Dexie from 'dexie';

import 'rxjs/add/observable/fromPromise';

@Injectable()
export class IndexedDbDexieService extends Dexie {

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
            this.dbTable.add(new ToDo({ id: 0, title: 'Add more todos!', complete: false }));
            this.dbTable.add(new ToDo({ id: 1, title: 'Click on checkbox to make me done!', complete: false }));
            this.dbTable.add(new ToDo({ id: 2, title: 'Press on trash to delete me!', complete: false }));
            this.dbTable.add(new ToDo({ id: 3, title: 'Press on pen to edit me!', complete: false }));
            console.log('%c DB populated', this.consoleTextColor);
        });
    }

    public openIndexedDb(): Observable<null> {
        return Observable.fromPromise(this.open().then(async () => {
            console.log('%c Opened %s successfully (v%d)', this.consoleTextColor, this.name, 1);
            return null;
        }).catch(error => {
            this.handleError('openIndexedDb', error);
        }));
    }

    public createTodo(todo: ToDo): Observable<ToDo> {
        return Observable.fromPromise(this.dbTable.add(todo).then(async (newId) => {
            const newTodo = await this.dbTable.get(newId);
            console.log('%c createTodo - added new todo: ', this.consoleTextColor, newTodo);
            return newTodo;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodoById(todoId: number): Observable<ToDo> {
        return Observable.fromPromise(this.dbTable.get(todoId).then(async (todo) => {
            console.log('%c getTodoById - todo result: ', this.consoleTextColor, todo);
            return todo;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodoByTitle(todoTitle: string) {
        this.dbTable.where('title').equalsIgnoreCase(todoTitle).toArray().then(async (todos) => {
            console.log('%c getTodoByTitle - todos result: ', this.consoleTextColor, todos);
        }).catch(error => {
            console.error(error);
        });
    }

    public getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        // TODO: Improve this method when Dexie 3.0 will be released (when equals() will support boolean)
        console.log('%c calling getAllTodos in IndexedDbDexieService', this.consoleTextColor);

        return Observable.fromPromise(this.dbTable.toArray().then(async (response) => {
            if (activeRouteState === 1 || activeRouteState === 2) {
                let todos: ToDo[] = [];

                todos = response.filter(item => {
                    return item.complete === (activeRouteState === 2 ? true : false);
                });

                console.log('%c getAllTodos - with activeRouteState = %d todos: ', this.consoleTextColor, activeRouteState, todos);
                return todos;
            } else {
                console.log('%c getAllTodos - response: ', this.consoleTextColor, response);
                return response;
            }
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public updateTodo(todo: ToDo) {
        // this.transaction('rw', this.dbTable, () => {
        //     this.dbTable.update(todo.id, todo).then(updResult => {
        //         if (updResult) {
        //             this.dbTable.get(todo.id).then(updatedTodo => {
        //                 console.log('%c updateTodo - updated value for item: ', this.consoleTextColor, updatedTodo);
        //             });
        //         }
        //     });

        //     // if (updResult) {
        //     //     const updatedTodo = this.dbTable.get(todo.id);
        //     //     console.log('%c updateTodo - updated value for item: ', this.consoleTextColor, updatedTodo);
        //     // }

        //     // this.dbTable.get(2).then(updatedTodo => {
        //     //     console.log('%c updateTodo - updated value for item: ', this.consoleTextColor, updatedTodo);
        //     // });
        // }).catch(error => {
        //     console.log(error);
        // });


        // TODO: Decide to use the method return type as ToDo or number (0 or 1) as far update() returns 1 if data updated and 0 if not
        // For perfomance Dexie.transaction() used (http://dexie.org/docs/Dexie/Dexie.transaction())
        this.transaction('rw', this.dbTable, async () => {
            await this.dbTable.update(todo.id, todo);
            return await this.dbTable.get(todo.id);
        }).then(async (updatedTodo) => {
            console.log('%c Transaction committed updatedTodo: ', this.consoleTextColor, updatedTodo);

        }).catch(err => {
            console.error(err.stack);
        });
    }

    // API: (toggle all todos complete status)
    public toggleAll(state: boolean, activeRouteState: number) {
        // Use primaryKeys for performance (http://dexie.org/docs/Collection/Collection.primaryKeys())
    }

    public deleteTodoById(todoId: number) {
        this.dbTable.delete(todoId).then(async () => {
            console.log('%c deleteTodoById - deleted value with id: ', this.consoleTextColor, todoId);
        });
    }

    // API: (delete completed todos)
    public clearCompleted(activeRouteState: number) {
        // Use primaryKeys for performance (http://dexie.org/docs/Collection/Collection.primaryKeys())
        // Example here https://github.com/jtorhoff/flier/blob/5c52eb0bda447fa6fcfc3d0bb99ef37e24d347cd/src/tg/Storage/DexieStorage.ts
    }

    public clearStore() {
        //
    }

    private handleError(source: string, error: Event | any) {
        console.error('IndexedDbDexieService (%s) - handleError: ', source, error.stack || error);
        return Observable.throw(error);
    }

}
