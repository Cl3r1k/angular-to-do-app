import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from './../../to-do';

import { CustomTodoComponentInterface } from './../todo-list-item-edit/dynamic2/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-view',
    templateUrl: './todo-list-item-view.component.html',
    styleUrls: ['./todo-list-item-view.component.css']
})
export class TodoListItemViewComponent implements OnInit, CustomTodoComponentInterface {

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
        // console.log('in TodoListItemViewComponent accepted todo.title: ' + this.todo.title);
    }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    editTodo(todo: ToDo) {
        alert('editTodo called in TodoListItemViewComponent with title: ' + this.todo.title);
        this.editTodoListItemEmitter.emit(todo);    // Emit the event to Parent component
    }

    updateTodo(todo: ToDo) {
        //
    }

    removeTodo(todo: ToDo) {
        console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemViewComponent');
        this.removeTodoListItemEmitter.emit(todo);
    }
}