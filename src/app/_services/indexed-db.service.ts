import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

// Models
import { Tag } from '@app/_models/tag';

// Services
import { TagLayerService } from '@app/_services/tag-layer.service';

// Modules
import Dexie from 'dexie';    // https://github.com/dfahlander/Dexie.js
import { Utils } from '@app/_common/utils';

// Imports
import { from as observableFrom, throwError as observableThrowError, Observable } from 'rxjs';

@Injectable()
export class IndexedDbService extends Dexie {

    dbTable: Dexie.Table<ToDo, number>;
    tagTable: Dexie.Table<Tag, number>;
    // ... other tables will go here... for more info look here (dexie.org/docs/Typescript)
    consoleTextColorService = 'color: salmon;';
    baseVersion = 3;

    hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text
    colorsHashtags: string[] = [
        '#00ced1',
        '#217273',
        '#bb3c3c',
        '#b32279',
        '#45c143',
        '#135012',
        '#c1692a',
        '#966441',
        '#797979',
        '#b97aff',
    ];

    constructor(private _utils: Utils, private _tagLayerService: TagLayerService) {
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

        // In version 4 added new table 'tagTable'
        this.version(4).stores({
            dbTable: `++id, title, complete,
                        inner_id, created_time, completed_time, updated_time, deleted_time, pin,
                        costedPomo, estimatedPomos, remindMe, remindTime, note`,
            tagTable: `++id, tagName, created_time, updated_time, color`
        });

        // In version 5 added field 'readyToDelete' in 'tagTable'
        this.version(5).stores({
            dbTable: `++id, title, complete,
                        inner_id, created_time, completed_time, updated_time, deleted_time, pin,
                        costedPomo, estimatedPomos, remindMe, remindTime, note`,
            tagTable: `++id, tagName, created_time, updated_time, color, readyToDelete`
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

            const tag: Tag = new Tag('#tagName');
            tag.color = this.colorsHashtags[0];
            this.tagTable.add(tag);
            console.log('%c DB populated successfully', this.consoleTextColorService);
        });
    }

    public openIndexedDb(): Observable<null> {
        return observableFrom(this.open().then(async () => {
            console.log('%c Opened %s successfully (v%d)', this.consoleTextColorService, this.name, 1);
            return null;
        }).catch(error => {
            this.handleError('openIndexedDb', error);
        }));
    }

    public createTodo(todo: ToDo): Observable<ToDo> {
        return observableFrom(this.dbTable.add(todo).then(async (newId) => {
            const newTodo = await this.dbTable.get(newId);

            // TODO: Do not forget to clean this line after
            // this.parseTag(todo);

            console.log('%c createTodo - added new todo: ', this.consoleTextColorService, newTodo);
            return newTodo;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodoById(todoId: number): Observable<ToDo> {
        return observableFrom(this.dbTable.get(todoId).then(async (todo) => {
            console.log('%c getTodoById - todo result: ', this.consoleTextColorService, todo);
            return todo;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodoByTitle(todoTitle: string): Observable<ToDo[]> {
        return observableFrom(this.dbTable.where('title').equalsIgnoreCase(todoTitle).toArray().then(async (todos) => {
            console.log('%c getTodoByTitle - todos result: ', this.consoleTextColorService, todos);
            return todos;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public getTodosAmountObject(): Observable<Object> {
        return observableFrom(this.transaction('r', this.dbTable, async () => {
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

    // public getTodosWithHashtag(hashtag: string): Observable<ToDo[]> {
    //     console.log('%c calling getTodosWithHashtag in IndexedDbService with hashtag:', this.consoleTextColorService, hashtag);
    //     return Observable.fromPromise(this.dbTable.toArray().then(async (response) => {
    //         let todos: ToDo[] = [];

    //         todos = response.filter(todo => {
    //             console.log(`%c in getTodosWithHashtag todo: `, this.consoleTextColorService, todo);
    //             return todo.title.toLowerCase().indexOf(hashtag.toLowerCase()) !== -1;
    //         });

    //         console.log('%c in getTodosWithHashtag todos: ', this.consoleTextColorService, todos);
    //         return todos;
    //     }).catch(error => {
    //         return error;    // TODO: Handle error properly as Observable
    //     }));
    // }

    // TODO: Improve this method when Dexie 3.0 will be released (when equals() will support boolean)
    public getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        // console.log('%c calling getAllTodos in IndexedDbService', this.consoleTextColorService);
        return observableFrom(this.dbTable.toArray().then(async (response) => {

            // const hashtagsInDb: Tag[] = await this.tagTable.toArray();
            // if (!hashtagsInDb.length) {
            //     // TODO: Perform request to backend, and if the answer is the same, then process every todo, to find hashtags
            //     response.map(todo => {
            //         this.parseTag(todo);
            //     });
            // }

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

    // TODO: Decide to use the method return type as ToDo or number (0 or 1) e.g. update() returns 1 if data updated and 0 if not
    public updateTodo(todo: ToDo): Observable<ToDo> {
        // For perfomance Dexie.transaction() used (http://dexie.org/docs/Dexie/Dexie.transaction())
        return observableFrom(this.transaction('rw', this.dbTable, this.tagTable, async () => {

            await this.dbTable.update(todo.id, todo);

            // TODO: Do not forget to clean line bellow after
            // this.parseTag(todo);

            const hashtagsInDb: Tag[] = await this.tagTable.toArray();
            const todos: ToDo[] = await this.dbTable.toArray();

            const updateTagsPending = this.cleanHashtags(todos, hashtagsInDb);

            if (updateTagsPending) {
                // console.log(`%cshould be Updated tags DB? `, this.consoleTextColorService, updateTagsPending);
                // console.log(`%cAFTER hashtagsInDB: `, this.consoleTextColorService, hashtagsInDb);
                const lastKey = await this.tagTable.bulkPut(hashtagsInDb);
                console.log(`%cin 'updateTodo()' lastKey: `, this.consoleTextColorService, lastKey);
            }

            // Next condition is for check, if lenght of list not equal in length in service, then don't change it
            // Example, if to edit todo, and add #hashtag, then 'updateHashtags()' will work after 'updateTodo()' ends
            // And so, new #hashtag will not be added to DB.
            // Rethink this part, when will be added sync with BackEnd
            if (this._tagLayerService.tags.length === hashtagsInDb.length) {
                this._tagLayerService.tags = hashtagsInDb;
            }

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
        return observableFrom(this.transaction('rw', this.dbTable, async () => {
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
        return observableFrom(this.transaction('rw', this.dbTable, this.tagTable, async () => {
            const todo = await this.dbTable.get(todoId);
            todo.updated_time = new Date().toISOString();
            todo.deleted_time = todo.updated_time;
            await this.dbTable.update(todo.id, todo);
            await this.dbTable.delete(todoId);

            // TODO: Do not forget to clean this line after
            // this.parseTag(todo);

            // TODO: Use watcher, and perform deletion after 5 seconds, if user didn't cancel deletion (service worker?)

            const hashtagsInDb: Tag[] = await this.tagTable.toArray();
            const todos: ToDo[] = await this.dbTable.toArray();

            const updateTagsPending = this.cleanHashtags(todos, hashtagsInDb);

            if (updateTagsPending) {
                // console.log(`%cshould be Updated tags DB? `, this.consoleTextColorService, updateTagsPending);
                // console.log(`%cAFTER hashtagsInDB: `, this.consoleTextColorService, hashtagsInDb);
                const lastKey = await this.tagTable.bulkPut(hashtagsInDb);
                console.log(`%cin 'updateTodo()' lastKey: `, this.consoleTextColorService, lastKey);
            }

            this._tagLayerService.tags = hashtagsInDb;

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
        return observableFrom(this.transaction('rw', this.dbTable, this.tagTable, async () => {
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

            const hashtagsInDb: Tag[] = await this.tagTable.toArray();
            const updateTagsPending = this.cleanHashtags(todos, hashtagsInDb);
            if (updateTagsPending) {
                const lastKey = await this.tagTable.bulkPut(hashtagsInDb);
                this._tagLayerService.tags = hashtagsInDb;
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
        return observableFrom(this.dbTable.clear().then(() => {
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

    // TODO: Add bulkAdd method using http://dexie.org/docs/Table/Table.bulkAdd() (look in TODO file)
    public addBatch() {
        //
    }

    private handleError(source: string, error: Event | any) {
        console.error('IndexedDbService (%s) - handleError: ', source, error.stack || error);
        return observableThrowError(error);
    }

    private async parseTag(todo: ToDo) {
        // Find #hashtags in text
        if (todo.title.match(this.hashtagsRegExp)) {
            const hashtagsInTitle = todo.title.match(this.hashtagsRegExp);
            // console.log(`%chashtags: `, this.consoleTextColorService, hashtags);

            let hashtagsInDb: Tag[] = await this.tagTable.toArray();
            const todos: ToDo[] = await this.dbTable.toArray();
            const hashtagTitlesInDb: string[] = hashtagsInDb.map(hashtag => {
                return hashtag.tagName;
            });

            console.log(`%cBEFORE hashtagsInDb: `, this.consoleTextColorService, hashtagsInDb);

            let updateTagsPending = false;
            hashtagsInTitle.map(hashtag => {
                if (!hashtagTitlesInDb.includes(hashtag.trim())) {
                    console.log(`%cNOT found in tagTable hashtag: `, this.consoleTextColorService, hashtag.trim());
                    const newHashtag: Tag = new Tag(hashtag.trim());

                    const maxColorIndex = this._tagLayerService.colorsHashtags.length - 1;
                    const rndColor = this._tagLayerService.colorsHashtags[this._utils.randomRangeInteger(0, maxColorIndex)];
                    newHashtag.color = rndColor;
                    // console.log(`%crndColor: `, this.consoleTextColorService, rndColor);

                    this.tagTable.add(newHashtag);
                } else {
                    let isPresent = false;

                    todos.map(todoItem => {
                        if (!isPresent && todoItem.title.match(this.hashtagsRegExp)) {
                            const text: string = todoItem.title.replace(this.hashtagsRegExp, function replacer($1, $2, $3) {
                                const space = $2;
                                const tagName = $3;

                                if (tagName === hashtag.trim()) {
                                    isPresent = true;
                                }

                                return todoItem.title;
                            });
                        }
                    });

                    // console.log(`%ctodos: `, this.consoleTextColorService, todos);
                    console.log(`%chashtag: %s isPresent: `, this.consoleTextColorService, hashtag, isPresent);

                    if (!isPresent) {
                        // const tagToUpdate = this.tagTable.get(6);
                        // console.log(`%ctagToUpdate: `, this.consoleTextColorService, tagToUpdate);
                        // console.log(`%cBEFORE hashtagsInDb: `, this.consoleTextColorService, hashtagsInDb);
                        hashtagsInDb.map(hashtagInDb => {
                            if (hashtagInDb.tagName === hashtag.trim() && !hashtagInDb.readyToDelete) {
                                hashtagInDb.updated_time = new Date().toISOString();
                                hashtagInDb.readyToDelete = true;
                                updateTagsPending = true;
                                console.log(`%cWill be marked as readyToDelete hashtagInDb: `, this.consoleTextColorService, hashtagInDb);
                            }
                        });
                    }
                }
            });

            if (updateTagsPending) {
                // console.log(`%cshould be Updated tags DB? `, this.consoleTextColorService, updateTagsPending);
                // console.log(`%cAFTER hashtagsInDB: `, this.consoleTextColorService, hashtagsInDb);
                const lastKey = await this.tagTable.bulkPut(hashtagsInDb);
            }

            // this.getAllHashtags();
            hashtagsInDb = [];
            hashtagsInDb = await this.tagTable.toArray();
            console.log(`%cUPDATED hashtagsInDB: `, this.consoleTextColorService, hashtagsInDb);
            this._tagLayerService.setTagsList(hashtagsInDb);
        }
    }

    // private async getAllHashtags() {
    //     const hashtagsInDb: Tag[] = await this.tagTable.toArray();
    //     this._tagLayerService.setTagsList(hashtagsInDb.filter(hashtag => !hashtag.readyToDelete));
    // }

    public getAllHashtags(): Observable<Tag[]> {
        // console.log('%c calling getAllTodos in IndexedDbService', this.consoleTextColorService);
        return observableFrom(this.tagTable.toArray().then(async (response) => {

            // TODO: This part is under construction ------

            // TODO: Perform request to backend, and if the answer is the same, then process every todo, to find #hashtags
            // Some part of code to process back-end <-------------------

            // In any case we just parse each todo to find #hashtags, for cleanup, or restore in IndexedDb
            const todos: ToDo[] = await this.dbTable.toArray();
            let updateTagsPending = false;

            // Here we should check each todo for #hashtags, and add if it's not in list (in case if db was corrupted)
            todos.map(todo => {
                if (todo.title.match(this.hashtagsRegExp)) {
                    const hashtagsArrayInTodoTitle = todo.title.match(this.hashtagsRegExp);
                    // console.log(`%chashtags: `, this.consoleTextColorService, hashtags);

                    const hashtagTitlesInDb: string[] = response.map(hashtag => {
                        return hashtag.tagName;
                    });

                    console.log(`%cBEFORE response: `, this.consoleTextColorService, response);

                    hashtagsArrayInTodoTitle.map(hashtag => {
                        if (!hashtagTitlesInDb.includes(hashtag.trim())) {
                            console.log(`%cNOT found in tagTable hashtag: `, this.consoleTextColorService, hashtag.trim());
                            const newHashtag: Tag = new Tag(hashtag.trim());

                            const maxColorIndex = this._tagLayerService.colorsHashtags.length - 1;
                            const rndColor = this._tagLayerService.colorsHashtags[this._utils.randomRangeInteger(0, maxColorIndex)];
                            newHashtag.color = rndColor;
                            // console.log(`%crndColor: `, this.consoleTextColorService, rndColor);

                            response.push(newHashtag);
                            updateTagsPending = true;
                        } else {
                            // tslint:disable-next-line:max-line-length
                            // console.log(`%cFOUND in tagTable hashtag: %s, and response: `, this.consoleTextColorService, hashtag.trim(), response);
                        }
                    });
                }
            });

            // const hashtagsInDb: Tag[] = await this.tagTable.toArray();

            updateTagsPending = updateTagsPending || this.cleanHashtags(todos, response);

            if (updateTagsPending) {
                // console.log(`%cshould be Updated tags DB? `, this.consoleTextColorService, updateTagsPending);
                // console.log(`%cAFTER response: `, this.consoleTextColorService, response);
                const lastKey = await this.tagTable.bulkPut(response);
                console.log(`%cin 'updateTodo()' lastKey: `, this.consoleTextColorService, lastKey);
            }
            // --------------------------------------

            return response;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    public updateHashtags(tags: Tag[]): Observable<null> {
        return observableFrom(this.transaction('rw', this.tagTable, async () => {
            // console.log('%c Incoming hashtagsList: ', this.consoleTextColorService, tags);

            const hashtagsInDb: Tag[] = await this.tagTable.toArray();
            const hashtagTitlesInDb: string[] = hashtagsInDb.map(hashtag => {
                return hashtag.tagName;
            });
            let updateTagsPending = false;

            console.log(`%cin 'updateHashtags()' incoming tags: `, 'color: purple;', tags);
            console.log(`%cin 'updateHashtags()' hashtagsInDb: `, 'color: purple;', hashtagsInDb);
            tags.map(tag => {
                if (hashtagTitlesInDb.indexOf(tag.tagName) === -1) {
                    hashtagsInDb.push(tag);
                    updateTagsPending = true;
                } else {
                    console.log('%cFound in IndexedDb tag: ', this.consoleTextColorService, tag);

                    if (hashtagsInDb[hashtagTitlesInDb.indexOf(tag.tagName)].readyToDelete !== tag.readyToDelete) {
                        hashtagsInDb[hashtagTitlesInDb.indexOf(tag.tagName)].readyToDelete = tag.readyToDelete;
                        updateTagsPending = true;
                    }
                    // TODO: For case when color is changed, we just should check hashtag.color in db and income tag.color
                }
            });

            if (updateTagsPending) {
                const lastKey = await this.tagTable.bulkPut(hashtagsInDb);
                console.log(`%cin 'updateHashtags()' lastKey: `, 'color: purple;', lastKey);
            }

            return null;
        }).then(async () => {
            console.log('%c Transaction committed successfully - updateHashtags.', this.consoleTextColorService);
            return null;
        }).catch(error => {
            return error;    // TODO: Handle error properly as Observable
        }));
    }

    private cleanHashtags(todos: ToDo[], hashtagsInDb: Tag[]): boolean {
        console.log('%cIn cleanHashtags todos and hashtagsInDb:', this.consoleTextColorService, todos, hashtagsInDb);

        let updateTagsPending = false;
        hashtagsInDb.map(hashtagInDb => {
            let isPresent = false;
            todos.map(todo => {
                if (todo.title.includes(hashtagInDb.tagName.trim())) {
                    // Used regexp to define that current hastag is present in todo.title
                    // Look here https://regex101.com/r/A0H4wO/1/
                    const hashtagRegExp = new RegExp(hashtagInDb.tagName.trim() + '($|\s)', 'i' );
                    if (todo.title.match(hashtagRegExp)) {
                        // console.log('%ctag: %s is Present in title: %s', this.consoleTextColorService, hashtagInDb.tagName, todo.title);
                        isPresent = true;
                    }
                }
            });

            // There is small conflict chance, when todo with tag deleted, page immediately reloaded, and then the same tag added
            if (!isPresent) {
                if (!hashtagInDb.readyToDelete) {
                    hashtagInDb.updated_time = new Date().toISOString();
                    hashtagInDb.readyToDelete = true;
                    updateTagsPending = true;
                    console.log(`%cWill be marked as readyToDelete hashtagInDb: `, this.consoleTextColorService, hashtagInDb);
                }
            } else {
                if (hashtagInDb.readyToDelete) {
                    console.log(`%cisPresent and readyToDelete hashtagInDb: `, this.consoleTextColorService, hashtagInDb);
                    hashtagInDb.updated_time = new Date().toISOString();
                    hashtagInDb.readyToDelete = false;
                    updateTagsPending = true;
                }
            }
        });

        return updateTagsPending;    // hashtagsInDb returned updated by ref
    }

    // public getTagColor(tagName: string): Observable<string> {
    //     return Observable.fromPromise(this.transaction('rw', this.tagTable, async () => {

    //         let hashtagsInDb = await this.tagTable.where('tagName').equalsIgnoreCase(tagName).toArray();
    //         let colorTag = 'red';

    //         console.log('%c getTagColor - tags result: ', this.consoleTextColorService, hashtagsInDb);

    //         if (!hashtagsInDb.length) {
    //             const newHashtag: Tag = new Tag(tagName.trim());
    // const maxColorIndex = this._tagLayerService.colorsHashtags.length - 1;
    // const rndColor = this._tagLayerService.colorsHashtags[this._utils.randomRangeInteger(0, maxColorIndex)];
    //             newHashtag.color = rndColor;
    //             // console.log(`%crndColor: `, this.consoleTextColorService, rndColor);
    //             this.tagTable.add(newHashtag);

    //             hashtagsInDb = await this.tagTable.where('tagName').equalsIgnoreCase(tagName).toArray();
    //         }

    //         if (hashtagsInDb.length) {
    //             colorTag = hashtagsInDb[0].color;
    //         }

    //         return colorTag;
    //     }).then(async (colorTag) => {
    //         console.log('%c Transaction committed getTagColor: ', this.consoleTextColorService, colorTag);
    //         return colorTag;
    //     }).catch(error => {
    //         return error;    // TODO: Handle error properly as Observable
    //     }));
    // }

}
