import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomTodoComponentInterface } from '../custom-todo-component-interface';
import { ToDo } from '../../../../to-do';

@Component({
    selector: 'app-details',
    template: `
        <h3>View TodoItem</h3>
        <label>{{todo.title}}</label>
        <button (click)='toggleTodoComplete(todo)'>Send data from TableComponent</button>
        <hr>
    `
})
export class DetailsComponent implements OnInit, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    @Output() toggleCompleteTodoListItemEmiter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        todo.title = todo.title + ' emited from DetailsComponent ';
        this.toggleCompleteTodoListItemEmiter.emit(todo);
    }

}
