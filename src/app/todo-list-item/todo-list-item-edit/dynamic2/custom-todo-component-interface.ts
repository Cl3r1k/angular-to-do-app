import { EventEmitter } from '@angular/core';
import { ToDo } from '../../../to-do';

export interface CustomTodoComponentInterface {
    todo: ToDo;

    toggleCompleteTodoListItemEmiter: EventEmitter<ToDo>;

    toggleTodoComplete(newTodo: ToDo);
}
