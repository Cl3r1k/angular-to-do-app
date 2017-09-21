import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

    @Input()
    todos: ToDo[];

    @Output()
    remove: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleComplete: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    onToggleTodoComplete(todo: ToDo) {
        this.toggleComplete.emit(todo);
    }

    onRemoveTodo(todo: ToDo) {
        this.remove.emit(todo);
    }

}
