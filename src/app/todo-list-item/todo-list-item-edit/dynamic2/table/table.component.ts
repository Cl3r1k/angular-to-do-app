import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomTodoComponentInterface } from './../custom-todo-component-interface';
import { ToDo } from './../../../../to-do';

@Component({
    selector: 'app-table',
    template: `
        <h3>Edit TodoItem</h3>
        <label>{{todo.title}}</label>
        <button (click)='toggleTodoComplete(todo)'>Send data from TableComponent</button>
        <hr>
    `
})
export class TableComponent implements OnInit, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    @Output() toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output() editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output() updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output() removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log('incoming todo.title in TableComponent' + this.todo.title);
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    editTodo(todo: ToDo) {
        throw new Error('Method not implemented.');
    }
    updateTodo(todo: ToDo) {
        throw new Error('Method not implemented.');
    }
    removeTodo(todo: ToDo) {
        throw new Error('Method not implemented.');
    }

}
