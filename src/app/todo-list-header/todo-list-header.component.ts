import { Component, Output, EventEmitter } from '@angular/core';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo-list-header',
    templateUrl: './todo-list-header.component.html',
    styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent {

    newTodo: ToDo = new ToDo();

    @Output()
    add: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    addTodo() {
        this.add.emit(this.newTodo);
        this.newTodo = new ToDo();
    }

}
