import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { environment } from '@env/environment.prod';

@Component({
    selector: 'app-todo-list-header',
    templateUrl: './todo-list-header.component.html',
    styleUrls: ['./todo-list-header.component.scss']
})
export class TodoListHeaderComponent {

    BUILD_VERSION = environment.version;

    newTodo: ToDo = new ToDo();

    @Input() todosAllAmount: number;
    @Input() todosAllCompleted: boolean;

    @Output()
    addTodoListHeaderEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleAllTodoListHeaderEmitter: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    addTodo() {
        if (this.newTodo.title) {
            this.newTodo.title = this.newTodo.title.trim();
            this.addTodoListHeaderEmitter.emit(this.newTodo);
            this.newTodo = new ToDo();
        }
    }

    toggleAllTodos(toggleState: boolean) {
        this.toggleAllTodoListHeaderEmitter.emit(toggleState);    // Emit the toggleAll event to TodosComponent
    }

}
