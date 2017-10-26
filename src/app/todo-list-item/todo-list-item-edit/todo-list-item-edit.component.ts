import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from './../../to-do';

import { CustomTodoComponentInterface } from './custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-edit',
    templateUrl: './todo-list-item-edit.component.html',
    styleUrls: ['./todo-list-item-edit.component.css']
})
export class TodoListItemEditComponent implements OnInit, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    initialTodoTitle: string;

    @Output()
    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.initialTodoTitle = this.todo.title;
    }

    toggleTodoComplete(todo: ToDo) {
        //
    }

    editTodo(todo: ToDo) {
        //
    }

    updateTodo(todo: ToDo) {
        if (todo.title) {
            this.updateTodoListItemEmitter.emit(todo);    // Emit the event to Parent Component
        } else {
            this.removeTodo(todo);
        }
    }

    removeTodo(todo: ToDo) {    // TODO: Perform confirmation for deletion
        console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemEditComponent');
        this.removeTodoListItemEmitter.emit(todo);
    }

    cancelEditTodo(todo: ToDo) {
        todo.title = this.initialTodoTitle;
        this.updateTodoListItemEmitter.emit(todo);
    }

    // TODO: Остановился здесь, стилизовать редактирование todo

}
