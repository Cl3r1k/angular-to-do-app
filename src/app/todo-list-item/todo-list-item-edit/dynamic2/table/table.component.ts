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

    @Output() toggleCompleteTodoListItemEmiter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        todo.title = todo.title + ' emited from TableComponent';
        this.toggleCompleteTodoListItemEmiter.emit(todo);
    }

}
