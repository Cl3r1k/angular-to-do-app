import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-list-footer',
    templateUrl: './todo-list-footer.component.html',
    styleUrls: ['./todo-list-footer.component.css']
})
export class TodoListFooterComponent {

    @Input() todosAllAmount: number;
    @Input() todosActiveAmount: number;
    @Input() todosCompletedAmount: number;

    @Output() clearTodoListFooterEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() clearHoverStateTodoListFooterEmitter: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    clearCompleted(clearState: boolean) {
        this.clearTodoListFooterEmitter.emit(clearState);
    }

    setClearCompletedHoverState(hoverState: boolean) {
        this.clearHoverStateTodoListFooterEmitter.emit(hoverState);
    }

}
