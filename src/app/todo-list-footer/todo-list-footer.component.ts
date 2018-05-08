import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-list-footer',
    templateUrl: './todo-list-footer.component.html',
    styleUrls: ['./todo-list-footer.component.scss']
})
export class TodoListFooterComponent {

    @Input() todosAllAmount: number;
    @Input() todosActiveAmount: number;
    @Input() todosCompletedAmount: number;

    constructor() { }

}
