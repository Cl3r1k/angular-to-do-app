import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo-list-item-edit',
    templateUrl: './todo-list-item-edit.component.html',
    styleUrls: ['./todo-list-item-edit.component.css']
})
export class TodoListItemEditComponent implements OnInit {

    @Input() todo: ToDo;

    @Output()
    remove: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleComplete: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoEvent: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleComplete.emit(todo);
    }

    removeTodo(todo: ToDo) {
        this.remove.emit(todo);
    }

    updateTodo(todo: ToDo) {
        this.updateTodoEvent.emit(todo);
    }

}
