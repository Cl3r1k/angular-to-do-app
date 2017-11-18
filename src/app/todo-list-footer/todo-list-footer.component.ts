import { Component, Input } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-list-footer',
    templateUrl: './todo-list-footer.component.html',
    styleUrls: ['./todo-list-footer.component.css']
})
export class TodoListFooterComponent {

    @Input() todosCount: number;

    constructor() { }

}
