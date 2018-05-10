import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-list-header',
    templateUrl: './todo-list-header.component.html',
    styleUrls: ['./todo-list-header.component.scss']
})
export class TodoListHeaderComponent {

    consoleTextColorComponent = 'color: cadetblue;';

    newTodo: ToDo = new ToDo();

    @Input() todosAllAmount: number;
    @Input() todosAllCompleted: boolean;

    @Output() addTodoListHeaderEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output() toggleAllTodoListHeaderEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() toggleAllHoverStateTodoListHeaderEmitter: EventEmitter<boolean> = new EventEmitter();

    newTodoFocusState = false;

    constructor() { }

    addTodo() {
        if (this.newTodo.title) {
            this.newTodo.title = this.newTodo.title.trim();
            this.addTodoListHeaderEmitter.emit(this.newTodo);
            this.newTodo = new ToDo();

            // console.log('%c Added new Todo, created_time: ', this.consoleTextColorComponent, this.newTodo.created_time);
        }
    }

    toggleAllTodos(toggleState: boolean) {
        this.toggleAllTodoListHeaderEmitter.emit(toggleState);    // Emit the toggleAll event to TodosComponent
    }

    setToggleAllHoverState(toggleAllHoverState: boolean) {
        this.toggleAllHoverStateTodoListHeaderEmitter.emit(toggleAllHoverState);
    }

    setNewTodoFocus(newTodoFocusState: boolean) {
        this.newTodoFocusState = newTodoFocusState;
    }

}
