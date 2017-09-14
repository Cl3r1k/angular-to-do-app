import { Injectable } from '@angular/core';
import { ToDo } from './to-do';

@Injectable()
export class TodoService {

    lastId = 0;  // Значение для последнего ID, с помощью которого мы будем имитировать автоматическое увеличение ID
    todos: ToDo[] = [];  // Массив в котором будут храниться записи

    constructor() { }

    // Имитируем метод POST при обращении к /todos
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

    // Имитируем метод DELETE при обращении к /todos/:id
    deleteTodoById(id: number): TodoService {
        if (id) {
            this.todos = this.todos.filter(item => {
                return item.id !== id;
            });
        }

        return this;
    }

    // Имитируем метод PUT при обращении к /todos/:id
    updateTodoById(id: number, values: Object = {}): ToDo {
        let todo = this.getTodoById(id);

        if (!todo) {
            return null;
        }

        Object.assign(todo, values);

        return todo;

    }

    // Имитируем метод GET при обращении к /todos
    getAllTodos(): ToDo[] {
        return this.todos;
    }

    // Имитируем метод GET при обращении к /todos/:id
    getTodoById(id: number): ToDo {
        return this.todos.filter(todo => todo.id === id).pop();
    }

    // Изменить статус записи
    toggleTodoComplete(todo: ToDo): ToDo {
        const updatedTodo = this.updateTodoById(todo.id, { complete: !todo.complete });

        return updatedTodo;
    }

}
