import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from './../../to-do';

@Component({
    selector: 'app-todo-list-item-view',
    templateUrl: './todo-list-item-view.component.html',
    styleUrls: ['./todo-list-item-view.component.css']
})
export class TodoListItemViewComponent implements OnInit {

    @Input() todo: ToDo;

    @Output()
    removeEventTodoListItemView: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleCompleteEventTodoListItemView: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

}
