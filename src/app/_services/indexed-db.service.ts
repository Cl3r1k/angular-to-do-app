import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { Observable } from 'rxjs/Observable';

import Dexie from 'dexie';    // https://github.com/dfahlander/Dexie.js

import 'rxjs/add/observable/fromPromise';

@Injectable()
export class IndexedDbService extends Dexie {

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
        console.log('%c Created/Inited/Opened %s (v%d)', this.consoleTextColor, this.name, 1);

        // This function runs once when base created (http://dexie.org/docs/Dexie/Dexie.on.populate#description)
        this.on('populate', () => {
            this.dbTable.add(new ToDo({ id: 0, title: 'Add more todos!', complete: false }));
            this.dbTable.add(new ToDo({ id: 1, title: 'Click on checkbox to make me done!', complete: false }));
            this.dbTable.add(new ToDo({ id: 2, title: 'Press on trash to delete me!', complete: false }));
            this.dbTable.add(new ToDo({ id: 3, title: 'Press on pen to edit me!', complete: false }));
            console.log('%c DB populated successfully', this.consoleTextColor);
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

    public getTodoByTitle(todoTitle: string): Observable<ToDo[]> {
        return Observable.fromPromise(this.dbTable.where('title').equalsIgnoreCase(todoTitle).toArray().then(async (todos) => {
            console.log('%c getTodoByTitle - todos result: ', this.consoleTextColor, todos);
            return todos;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodosAmountObject(): Observable<Object> {
        return Observable.fromPromise(this.transaction('r', this.dbTable, async () => {
            const todos: ToDo[] = await this.dbTable.toArray();

            let activeTodos = 0;
            let completeTodos = 0;

            todos.forEach(todo => {
                todo.complete ? completeTodos++ : activeTodos++;
            });

            return { all: todos.length, active: activeTodos, complete: completeTodos };
        }).then(async (todosAmount) => {
            console.log('%c Transaction committed getTodosAmountObject: ', this.consoleTextColor, todosAmount);
            return todosAmount;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    // TODO: Improve this method when Dexie 3.0 will be released (when equals() will support boolean)
    public getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        // console.log('%c calling getAllTodos in IndexedDbService', this.consoleTextColor);
        return Observable.fromPromise(this.dbTable.toArray().then(async (response) => {
            if (activeRouteState === 1 || activeRouteState === 2) {
                let todos: ToDo[] = [];

                todos = response.filter(todo => {
                    return todo.complete === (activeRouteState === 2 ? true : false);
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

    // TODO: Decide to use the method return type as ToDo or number (0 or 1) as far update() returns 1 if data updated and 0 if not
    public updateTodo(todo: ToDo): Observable<ToDo> {
        // For perfomance Dexie.transaction() used (http://dexie.org/docs/Dexie/Dexie.transaction())
        return Observable.fromPromise(this.transaction('rw', this.dbTable, async () => {
            await this.dbTable.update(todo.id, todo);
            return await this.dbTable.get(todo.id);
        }).then(async (updatedTodo) => {
            console.log('%c Transaction committed updatedTodo: ', this.consoleTextColor, updatedTodo);
            return updatedTodo;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    // API: (toggle all todos complete status)
    public toggleAll(toggleState: boolean, activeRouteState: number): Observable<ToDo[]> {
        return Observable.fromPromise(this.transaction('rw', this.dbTable, async () => {
            const todos: ToDo[] = await this.dbTable.toArray();

            todos.forEach(todo => {
                return todo.complete = toggleState;
            });

            const lastKey = await this.dbTable.bulkPut(todos);

            // console.log('%c lastKey: %d, todos[length - 1].id: %d', this.consoleTextColor, lastKey, todos[todos.length - 1].id);

            if (activeRouteState === 1 || activeRouteState === 2) {
                todos.filter(todo => {
                    return todo.complete === toggleState;
                });
            }

            return todos;
        }).then(async (updatedTodos) => {
            console.log('%c Transaction committed toggleAll: ', this.consoleTextColor, updatedTodos);
            return updatedTodos;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public deleteTodoById(todoId: number): Observable<null> {
        return Observable.fromPromise(this.dbTable.delete(todoId).then(async () => {
            console.log('%c deleteTodoById - deleted value with id: ', this.consoleTextColor, todoId);
            return null;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    // API: (delete completed todos)
    public clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        return Observable.fromPromise(this.transaction('rw', this.dbTable, async () => {
            let todos: ToDo[] = await this.dbTable.toArray();
            const todosIds: number[] = [];

            todos.forEach(todo => {
                if (todo.complete) {
                    todosIds.push(todo.id);
                }
            });

            // console.log('%c todos Ids to delete:', this.consoleTextColor, todosIds);

            const resDelete = await this.dbTable.bulkDelete(todosIds);

            todos = await this.dbTable.toArray();

            if (activeRouteState === 1 || activeRouteState === 2) {
                todos = todos.filter(todo => {
                    return todo.complete === (activeRouteState === 2 ? true : false);
                });
            }

            // console.log('%c returned todos:', this.consoleTextColor, todos);
            return todos;
        }).then(async (updatedTodos) => {
            console.log('%c Transaction committed clearCompleted: ', this.consoleTextColor, updatedTodos);
            return updatedTodos;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public clearStore(): Observable<null> {
        return Observable.fromPromise(this.dbTable.clear().then(() => {
            console.log('%c clearStore -> all items deleted', this.consoleTextColor);
            return null;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    // TODO: Add bulkAdd method using http://dexie.org/docs/Table/Table.bulkAdd() (look in todo file)
    public addBatch() {
        //
    }

    private handleError(source: string, error: Event | any) {
        console.error('IndexedDbService (%s) - handleError: ', source, error.stack || error);
        return Observable.throw(error);
    }

}
