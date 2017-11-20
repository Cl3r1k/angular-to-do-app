import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

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

    showDialog = false;

    removeTodo() {
        this.showDialogWindow(false);
        alert('The todo deleted!');
    }

    constructor(private renderer: Renderer2) { }

    showDialogWindow(state: boolean) {
        this.showDialog = state;

        if (this.showDialog) {
            this.renderer.addClass(document.body, 'modal-open');
        } else {
            this.renderer.removeClass(document.body, 'modal-open');
        }
    }

    addTodo() {
        if (this.newTodo.title) {
            this.newTodo.title = this.newTodo.title.trim();
            this.addTodoListHeaderEmitter.emit(this.newTodo);
            this.newTodo = new ToDo();
        }
    }

}
