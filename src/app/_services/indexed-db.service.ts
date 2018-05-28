import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';
import { Tag } from '@app/_models/tag';

import { Observable } from 'rxjs/Observable';

import Dexie from 'dexie';    // https://github.com/dfahlander/Dexie.js

import 'rxjs/add/observable/fromPromise';

@Injectable()
export class IndexedDbService extends Dexie {

    dbTable: Dexie.Table<ToDo, number>;
    tagTable: Dexie.Table<Tag, number>;
    // ... other tables will go here... for more info look here (dexie.org/docs/Typescript)
    consoleTextColorService = 'color: salmon;';
    baseVersion = 3;

    constructor() {
        super('Database');

        // How to upgrade DB version (http://dexie.org/docs/Tutorial/Design#database-versioning)
        this.version(1).stores({
            dbTable: '++id, title, complete'
        });

        // In version 2 added fields for 'pin' and 'time-operations'
        this.version(2).stores({
            dbTable: '++id, title, complete, inner_id, created_time, completed_time, updated_time, deleted_time, pin'
        });

        // In version 3 added fields for 'more-dialog'
        this.version(3).stores({
            dbTable: `++id, title, complete,
                        inner_id, created_time, completed_time, updated_time, deleted_time, pin,
                        costedPomo, estimatedPomos, remindMe, remindTime, note`
        });

        // In version 4 added fields for 'more-dialog'
        this.version(4).stores({
            dbTable: `++id, title, complete,
                        inner_id, created_time, completed_time, updated_time, deleted_time, pin,
                        costedPomo, estimatedPomos, remindMe, remindTime, note`,
            tagTable: `++id, tagName, created_time, updated_time, color`
        });

        // mapToClass (http://dexie.org/docs/Table/Table.mapToClass())
        this.dbTable.mapToClass(ToDo);
        this.tagTable.mapToClass(Tag);
        console.log('%c Created/Inited/Opened %s (v%d)', this.consoleTextColorService, this.name, this.baseVersion);

        // This function runs once when base created (http://dexie.org/docs/Dexie/Dexie.on.populate#description)
        this.on('populate', () => {
            this.dbTable.add(new ToDo({ id: 0, title: '1. Add more todos!', complete: false }));
            this.dbTable.add(new ToDo({ id: 1, title: '2. Todo with priority 1 !', complete: false }));
            this.dbTable.add(new ToDo({ id: 2, title: '3. Todo with #tagName', complete: false }));
            this.dbTable.add(new ToDo({ id: 3, title: '4. Todo with URL https://google.com', complete: false }));
            this.dbTable.add(new ToDo({ id: 4, title: '5. Double click to edit me!', complete: false }));
            this.dbTable.add(new ToDo({ id: 5, title: '6. Press on pin icon to pin/unpin me!', complete: false }));
            this.dbTable.add(new ToDo({ id: 6, title: '7. Press on dots for advanced settings!', complete: false }));
            this.dbTable.add(new ToDo({ id: 7, title: '8. Click on checkbox to mark as completed!', complete: false }));
            // tslint:disable-next-line:max-line-length
            this.dbTable.add(new ToDo({ id: 8, title: '9. Todo with large text example ---------------------------------------------------------------------------------------------------------->', complete: false }));
            this.dbTable.add(new ToDo({ id: 9, title: '10. Completed todo', complete: true }));
            console.log('%c DB populated successfully', this.consoleTextColorService);
        });
    }

    public openIndexedDb(): Observable<null> {
        return Observable.fromPromise(this.open().then(async () => {
            console.log('%c Opened %s successfully (v%d)', this.consoleTextColorService, this.name, 1);
            return null;
        }).catch(error => {
            this.handleError('openIndexedDb', error);
        }));
    }

    public createTodo(todo: ToDo): Observable<ToDo> {
        return Observable.fromPromise(this.dbTable.add(todo).then(async (newId) => {
            const newTodo = await this.dbTable.get(newId);
            console.log('%c createTodo - added new todo: ', this.consoleTextColorService, newTodo);
            return newTodo;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodoById(todoId: number): Observable<ToDo> {
        return Observable.fromPromise(this.dbTable.get(todoId).then(async (todo) => {
            console.log('%c getTodoById - todo result: ', this.consoleTextColorService, todo);
            return todo;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodoByTitle(todoTitle: string): Observable<ToDo[]> {
        return Observable.fromPromise(this.dbTable.where('title').equalsIgnoreCase(todoTitle).toArray().then(async (todos) => {
            console.log('%c getTodoByTitle - todos result: ', this.consoleTextColorService, todos);
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
            console.log('%c Transaction committed getTodosAmountObject: ', this.consoleTextColorService, todosAmount);
            return todosAmount;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodosWithHashtag(hashtag: string): Observable<ToDo[]> {
        console.log('%c calling getTodosWithHashtag in IndexedDbService with hashtag:', this.consoleTextColorService, hashtag);
        return Observable.fromPromise(this.dbTable.toArray().then(async (response) => {
            let todos: ToDo[] = [];

            todos = response.filter(todo => {
                console.log(`%c in getTodosWithHashtag todo: `, this.consoleTextColorService, todo);
                return todo.title.toLowerCase().indexOf(hashtag.toLowerCase()) > 0;
            });

            console.log('%c in getTodosWithHashtag todos: ', this.consoleTextColorService, todos);
            return todos;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    // TODO: Improve this method when Dexie 3.0 will be released (when equals() will support boolean)
    public getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        // console.log('%c calling getAllTodos in IndexedDbService', this.consoleTextColorService);
        return Observable.fromPromise(this.dbTable.toArray().then(async (response) => {
            if (activeRouteState === 1 || activeRouteState === 2) {
                let todos: ToDo[] = [];

                todos = response.filter(todo => {
                    return todo.complete === (activeRouteState === 2 ? true : false);
                });

                console.log('%c getAllTodos - with activeRouteState = %d todos: ', this.consoleTextColorService, activeRouteState, todos);
                return todos;
            } else {
                console.log('%c getAllTodos - response: ', this.consoleTextColorService, response);
                return response;
            }
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    // TODO: Decide to use the method return type as ToDo or number (0 or 1) as far update() returns 1 if data updated and 0 if not
    public updateTodo(todo: ToDo): Observable<ToDo> {
        // For perfomance Dexie.transaction() used (http://dexie.org/docs/Dexie/Dexie.transaction())
        return Observable.fromPromise(this.transaction('rw', this.dbTable, this.tagTable, async () => {
            const tag: Tag = new Tag('#tagName');

            await this.dbTable.update(todo.id, todo);
            return await this.dbTable.get(todo.id);
        }).then(async (updatedTodo) => {
            console.log('%c Transaction committed updatedTodo: ', this.consoleTextColorService, updatedTodo);
            return updatedTodo;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    // API: (toggle all todos complete status)
    public toggleAll(toggleState: boolean, activeRouteState: number): Observable<ToDo[]> {
        return Observable.fromPromise(this.transaction('rw', this.dbTable, async () => {
            let todos: ToDo[] = await this.dbTable.toArray();

            todos.forEach(todo => {
                todo.updated_time = new Date().toISOString();

                toggleState ? todo.completed_time = todo.updated_time : todo.completed_time = null;

                return todo.complete = toggleState;
            });

            const lastKey = await this.dbTable.bulkPut(todos);

            // console.log('%c lastKey: %d, todos[length - 1].id: %d', this.consoleTextColorService, lastKey, todos[todos.length - 1].id);

            if (activeRouteState === 1 || activeRouteState === 2) {

                todos = todos.filter(todo => {
                    return todo.complete === (activeRouteState === 2 ? true : false);
                });
            }

            return todos;
        }).then(async (updatedTodos) => {
            console.log('%c Transaction committed toggleAll: ', this.consoleTextColorService, updatedTodos);
            return updatedTodos;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public deleteTodoById(todoId: number): Observable<null> {
        return Observable.fromPromise(this.transaction('rw', this.dbTable, async () => {
            const todo = await this.dbTable.get(todoId);
            todo.updated_time = new Date().toISOString();
            todo.deleted_time = todo.updated_time;
            await this.dbTable.update(todo.id, todo);
            await this.dbTable.delete(todoId);

            // TODO: Use watcher, and perform deletion after 5 seconds, if user didn't cancel deletion (service worker?)

            return null;
        }).then(async () => {
            console.log('%c deleteTodoById - deleted value with id: ', this.consoleTextColorService, todoId);
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
                    todo.completed_time = new Date().toISOString();
                    todo.updated_time = todo.completed_time;
                    todosIds.push(todo.id);
                }
            });

            // console.log('%c todos Ids to delete:', this.consoleTextColorService, todosIds);

            // TODO: Use watcher, and perform deletion after 5 seconds, if user didn't cancel deletion (service worker?)

            const resDelete = await this.dbTable.bulkDelete(todosIds);

            todos = await this.dbTable.toArray();

            if (activeRouteState === 1 || activeRouteState === 2) {
                todos = todos.filter(todo => {
                    return todo.complete === (activeRouteState === 2 ? true : false);
                });
            }

            // console.log('%c returned todos:', this.consoleTextColorService, todos);
            return todos;
        }).then(async (updatedTodos) => {
            console.log('%c Transaction committed clearCompleted: ', this.consoleTextColorService, updatedTodos);
            return updatedTodos;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public clearStore(): Observable<null> {
        return Observable.fromPromise(this.dbTable.clear().then(() => {
            console.log('%c clearStore -> all items deleted', this.consoleTextColorService);
            return null;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    // API: (move todo to new position)
    // public moveTodo(moveState: Object, activeRouteState: number): Observable<ToDo[]> {
    //     return Observable.fromPromise(this.transaction('rw', this.dbTable, async () => {
    //         let todos: ToDo[] = await this.dbTable.toArray();
    //         const fromId = moveState['movedTodoIdDest'];
    //         const toId = moveState['movedTodoIdSource'];

    //         const direction = fromId < toId ? 1 : -1;

    //         // console.log('%c moveState in service:', this.consoleTextColorService, moveState);

    //         if (direction > 0) {
    //             let processMovement = false;
    //             let performBreak = false;
    //             for (let index = todos.length - 1; index >= 0; index--) {
    //                 if (todos[index].id === fromId) {
    //                     performBreak = true;
    //                 }
    //                 if (processMovement) {
    //                     const todoIdTmp = todos[index].id;
    //                     todos[index].id = todos[index + 1].id;
    //                     todos[index + 1].id = todoIdTmp;
    //                     if (performBreak) {
    //                         break;
    //                     }
    //                 }
    //                 if (todos[index].id === toId) {
    //                     processMovement = true;
    //                 }
    //             }
    //         } else {
    //             let processMovement = false;
    //             let performBreak = false;
    //             for (let index = 0; index < todos.length; index++) {
    //                 if (todos[index].id === fromId) {
    //                     performBreak = true;
    //                 }
    //                 if (processMovement) {
    //                     const todoIdTmp = todos[index].id;
    //                     todos[index].id = todos[index - 1].id;
    //                     todos[index - 1].id = todoIdTmp;
    //                     if (performBreak) {
    //                         break;
    //                     }
    //                 }
    //                 if (todos[index].id === toId) {
    //                     processMovement = true;
    //                 }
    //             }
    //         }

    //         // console.log('%c AFTER movements Array is:', this.consoleTextColorService, todos);

    //         await this.dbTable.clear();
    //         const lastKey = await this.dbTable.bulkPut(todos);
    // tslint:disable-next-line:max-line-length
    //         // console.log('%c lastKey: %d, todos[length - 1].id: %d', this.consoleTextColorService, lastKey, todos[todos.length - 1].id);

    //         todos = await this.dbTable.toArray();

    //         if (activeRouteState === 1 || activeRouteState === 2) {
    //             todos = todos.filter(todo => {
    //                 return todo.complete === (activeRouteState === 2 ? true : false);
    //             });
    //         }

    //         return todos;
    //     }).then(async (updatedTodos) => {
    //         console.log('%c Transaction committed moveTodo: ', this.consoleTextColorService, updatedTodos);
    //         return updatedTodos;
    //     }).catch(error => {
    //         return error;    // TODO: Handle error properly as Observable
    //     }));
    // }

    // TODO: Add bulkAdd method using http://dexie.org/docs/Table/Table.bulkAdd() (look in todo file)
    public addBatch() {
        //
    }

    private handleError(source: string, error: Event | any) {
        console.error('IndexedDbService (%s) - handleError: ', source, error.stack || error);
        return Observable.throw(error);
    }

}
