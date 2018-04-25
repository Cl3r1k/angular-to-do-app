import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { Observable } from 'rxjs/Observable';

// Services
import { ApiService } from '@app/_services/api.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';
import { TodoOrderService } from '@app/_services/todo-order.service';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class TodoService {

    serviceState = 1;

    // TODO: Use only IndexedDbService, and sync data with backend
    constructor(private _api: ApiService, public _indexedDbService: IndexedDbService, private _todoOrderService: TodoOrderService) {
        console.log('constructor in TodoService');
    }

    initIndexedDbBase(): Observable<null> {
        return this._indexedDbService.openIndexedDb();    // Init/Open base
    }

    // Simulate POST /todos
    addTodo(todo: ToDo): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.createTodo(todo);
        } else {
            return this._api.createTodo(todo);
        }
    }

    // Simulate GET /todos/:id
    getTodoById(id: number): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.getTodoById(id);
        } else {
            return this._api.getTodoById(id);
        }
    }

    // Simulate GET /todos (amount of active todos)
    getActiveTodosAmount(): Observable<number> {
        return this._api.getActiveTodosAmount();
    }

    // Simulate GET /todos (amount of all todos)
    getAllTodosAmount(): Observable<number> {
        return this._api.getAllTodosAmount();
    }

    getTodosAmountObject(): Observable<Object> {
        return this._indexedDbService.getTodosAmountObject();
    }

    // Simulate GET /todos (according to activeRouteState: 0 - All todos, 1 - only active, 2 - only completed)
    getAllTodos(activeRouteState: number): Observable<ToDo[]> {
        if (this.serviceState === 1) {

            return this._indexedDbService.getAllTodos(activeRouteState).pipe(
                map(todos => {
                    if (activeRouteState === 0) {    // Perform sorting by order only for unfiltered list
                        let todoList: ToDo[] = [];

                        const todoOrderList = this._todoOrderService.getOrder();

                        todoList = this.sortListByOrder(todos, todoOrderList);

                        // console.log('%cfound todoList: ', 'color: red;', todoList);

                        return (todoList);
                    }

                    return (todos);
                })
            );

            // return this._indexedDbService.getAllTodos(activeRouteState);
        } else {
            return this._api.getAllTodos(activeRouteState);
        }
    }

    // Simulate PUT /todos/:id
    updateTodo(todo: ToDo): Observable<ToDo> {

        todo.updated_time = new Date().toISOString();

        if (this.serviceState === 1) {
            return this._indexedDbService.updateTodo(todo);
        } else {
            return this._api.updateTodo(todo);
        }
    }

    // Toggle todo complete
    toggleTodoComplete(todo: ToDo): Observable<ToDo> {
        todo.complete = !todo.complete;

        todo.complete ? todo.completed_time = new Date().toISOString() : todo.completed_time = null;

        return this.updateTodo(todo);
    }

    pinTodo(todo: ToDo, todos: ToDo[]): Observable<ToDo[]> {
        const prevTodoPinState = todo.pin;
        todo.pin = !todo.pin;

        return this.updateTodo(todo).switchMap((todoResult) => {
            // console.log('prevTodoPinState: ', prevTodoPinState);
            // console.log('todoResult.pin: ', todoResult.pin);
            let pinnedTodosOrderList: string[];
            let unpinnedTodosOrderList: string[];
            let completedTodosOrderList: string[];

            pinnedTodosOrderList = todos.filter(todoItem => {
                return !todoItem.complete && todoItem.pin;
            }).map(todoId => {
                return todoId.inner_id;
            });

            unpinnedTodosOrderList = todos.filter(todoItem => {
                return !todoItem.complete && !todoItem.pin;
            }).map(todoId => {
                return todoId.inner_id;
            });

            completedTodosOrderList = todos.filter(todoItem => {
                return todoItem.complete;
            }).map(todoId => {
                return todoId.inner_id;
            });

            if (!prevTodoPinState) {    // The list comes from parent updated, and we need to pump todo to top of the list
                const indexTodo = pinnedTodosOrderList.indexOf(todo.inner_id, 0);
                pinnedTodosOrderList.splice(indexTodo, 1);
                pinnedTodosOrderList.unshift(todo.inner_id);
            } else {
                const indexTodo = unpinnedTodosOrderList.indexOf(todo.inner_id, 0);
                unpinnedTodosOrderList.splice(indexTodo, 1);
                unpinnedTodosOrderList.unshift(todo.inner_id);
            }

            // Reorder list with new state
            const todoOrderList: string[] = pinnedTodosOrderList.concat(unpinnedTodosOrderList, completedTodosOrderList);

            const updatedOrder: boolean = this._todoOrderService.updateOrder(todoOrderList);
            // console.log('%cAfter todoOrderList: ', 'color: red;', todoOrderList);

            return this.getAllTodos(0);
        });
    }

    // Simulate Toggle all PUT /todos
    toggleAll(toggleState: boolean, activeRouteState: number): Observable<ToDo[]> {
        // return this._api.toggleAll(state);
        return this._indexedDbService.toggleAll(toggleState, activeRouteState);
    }

    // Simulate DELETE /todos/:id
    deleteTodoById(id: number): Observable<ToDo> {
        if (this.serviceState === 1) {
            return this._indexedDbService.deleteTodoById(id);
        } else {
            return this._api.deleteTodoById(id);
        }
    }

    // Simulate clear Completed PUT /todos
    clearCompleted(activeRouteState: number): Observable<ToDo[]> {
        if (this.serviceState === 1) {
            return this._indexedDbService.clearCompleted(activeRouteState).pipe(
                map(todos => {
                    // Reorder list with new list of todos
                    let todoOrderList = this._todoOrderService.getOrder();

                    // console.log('%cBefore todoOrderList: ', 'color: red;', todoOrderList);

                    const innerIdList = todos.map(todo => {
                        return todo.inner_id;
                    });

                    todoOrderList = todoOrderList.filter(todoInnerId => {
                        const indexTodo = innerIdList.indexOf(todoInnerId, 0);
                        return indexTodo >= 0;
                    });

                    todos = this.sortListByOrder(todos, todoOrderList);

                    const updatedOrder = this._todoOrderService.updateOrder(todoOrderList);
                    // console.log('%cAfter todoOrderList: ', 'color: red;', todoOrderList);

                    return todos;
                })
            );
        } else {
            return this._api.clearCompleted(activeRouteState);
        }
    }

    sortListByOrder(todos: ToDo[], todoOrderList: string[]): ToDo[] {
        const todoList: ToDo[] = [];

        if (!todoOrderList) {
            todoOrderList = todos.map(todo => {
                return todo.inner_id;
            });

            this._todoOrderService.updateOrder(todoOrderList);
        }

        todoOrderList.map(inner_id => {
            todos.map(todo => {
                if (todo.inner_id === inner_id) {
                    // console.log('%cfound todo: ', 'color: green;', todo);
                    todoList.push(todo);
                }
            });
        });

        return (todoList);
    }

    // Perform moveTodo in Service
    // moveTodo(moveState: Object, activeRouteState: number): Observable<ToDo[]> {
    //     return this._indexedDbService.moveTodo(moveState, activeRouteState);
    // }

}
