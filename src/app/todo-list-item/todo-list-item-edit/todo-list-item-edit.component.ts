import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from './../../to-do';

import { CustomTodoComponentInterface } from './dynamic2/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-edit',
    templateUrl: './todo-list-item-edit.component.html',
    styleUrls: ['./todo-list-item-edit.component.css']
})
export class TodoListItemEditComponent implements OnInit, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    @Output()
    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() {
        // console.log('in TodoListItemEditComponent accepted todo.title: ' + this.todo.title);
    }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    editTodo(todo: ToDo) {
        //
    }

    updateTodo(todo: ToDo) {
        this.updateTodoListItemEmitter.emit(todo);    // Emit the event to Parent Component
    }

    removeTodo(todo: ToDo) {
        console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemEditComponent');
        this.removeTodoListItemEmitter.emit(todo);
    }

}
