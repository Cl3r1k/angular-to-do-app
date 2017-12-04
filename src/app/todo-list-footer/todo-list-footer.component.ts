import { Component, Input } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-list-footer',
    templateUrl: './todo-list-footer.component.html',
    styleUrls: ['./todo-list-footer.component.css']
})
export class TodoListFooterComponent {

    @Input() todosIncompletedAmount: number;
    @Input() todosAllAmount: number;

    constructor() { }

    clearCompleted() {
        alert('Clear completed tasks?');
    }

}
