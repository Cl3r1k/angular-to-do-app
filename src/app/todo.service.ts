import { Injectable } from '@angular/core';
import { ToDo } from './to-do';

@Injectable()
export class TodoService {

    lastId = 0;  // Placeholder for last id so we can simulate automatic incrementing for id's
    todos: ToDo[] = [];  // Array placeholder for todo's

    constructor() { }

    // Simulate POST /todos
    addTodo(todo: ToDo): TodoService {
        if (!todo.title) {
            return;
        }

        if (!todo.id) {
            todo.id = ++this.lastId;
        }

        this.todos.push(todo);

        return this;
    }

    // Simulate DELETE /todos/:id
    deleteTodoById(id: number): TodoService {
        if (id) {
            this.todos = this.todos.filter(item => {
                return item.id !== id;
            });
        }

        return this;
    }

    // Simulate PUT /todos/:id
    updateTodoById(id: number, values: Object = {}): ToDo {
        let todo = this.getTodoById(id);

        if (!todo) {
            return null;
        }

        Object.assign(todo, values);

        return todo;
    }

    // Simulate GET /todos
    getAllTodos(): ToDo[] {
        return this.todos;
    }

    // Simulate GET /todos/:id
    getTodoById(id: number): ToDo {
        return this.todos.filter(todo => todo.id === id).pop();
    }

    // Toggle todo complete
    toggleTodoComplete(todo: ToDo): ToDo {
        const updatedTodo = this.updateTodoById(todo.id, { complete: !todo.complete });

        return updatedTodo;
    }

}
