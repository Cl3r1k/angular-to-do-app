import { EventEmitter } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

export interface CustomTodoComponentInterface {
    todo: ToDo;

    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo>;

    editTodoListItemEmitter: EventEmitter<ToDo>;

    updateTodoListItemEmitter: EventEmitter<ToDo>;

    cancelTodoListItemEmitter: EventEmitter<boolean>;

    removeTodoListItemEmitter: EventEmitter<ToDo>;

    toggleTodoComplete(todo: ToDo);

    editTodo(todo: ToDo);

    updateTodo(todo: ToDo);

    removeTodo(todo: ToDo);
}
