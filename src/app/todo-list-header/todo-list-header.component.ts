import { Component, Output, EventEmitter } from '@angular/core';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo-list-header',
    templateUrl: './todo-list-header.component.html',
    styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent {

    newTodo: ToDo = new ToDo({ title: '☐ Find ☐ Add '});    // TODO: Do not forget to change it back, after tests

    @Output()
    addTodoListHeaderEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    addBatchTodoListHeaderEmitter: EventEmitter<string> = new EventEmitter();

    constructor() { }

    addTodo() {
        if (this.newTodo.title) {
            this.newTodo.title = this.newTodo.title.trim();

            if (this.newTodo.title.includes('☐') || this.newTodo.title.includes('✔')) {
                this.addBatchTodoListHeaderEmitter.emit(this.newTodo.title);
            } else {
                this.addTodoListHeaderEmitter.emit(this.newTodo);
            }

            this.newTodo = new ToDo();
        }
    }

}
