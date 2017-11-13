import { Component, Output, EventEmitter } from '@angular/core';
import { ToDo } from '@app/to-do';

import { environment } from '@env/environment.prod';

@Component({
    selector: 'app-todo-list-header',
    templateUrl: './todo-list-header.component.html',
    styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent {

    BUILD_VERSION = environment.version;

    newTodo: ToDo = new ToDo();

    @Output()
    addTodoListHeaderEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    addTodo() {
        if (this.newTodo.title) {
            this.newTodo.title = this.newTodo.title.trim();
            this.addTodoListHeaderEmitter.emit(this.newTodo);
            this.newTodo = new ToDo();
        }
    }

}
