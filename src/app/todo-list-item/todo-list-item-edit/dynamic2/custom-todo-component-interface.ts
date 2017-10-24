import { EventEmitter } from '@angular/core';
import { ToDo } from '../../../to-do';

export interface CustomTodoComponentInterface {
    todo: ToDo;

    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo>;

    editTodoListItemEmitter: EventEmitter<ToDo>;

    updateTodoListItemEmitter: EventEmitter<ToDo>;

    removeTodoListItemEmitter: EventEmitter<ToDo>;

    toggleTodoComplete(todo: ToDo);

    editTodo(todo: ToDo);

    updateTodo(todo: ToDo);

    removeTodo(todo: ToDo);
}
