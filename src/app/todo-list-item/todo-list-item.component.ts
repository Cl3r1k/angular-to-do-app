import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo-list-item',
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {

    @Input() todo: ToDo;

    @Output()
    removeEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleCompleteEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteEventTodoListItem.emit(todo);
    }

    removeTodo(todo: ToDo) {
        this.removeEventTodoListItem.emit(todo);
    }

    editTodo(todo: ToDo) {
        alert('edit todo with title: ' + this.todo.title);
        this.editTodoEventTodoListItem.emit(todo);    // Emit the event to TodoListComponent
    }

}
