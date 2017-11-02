import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToDo } from './../../to-do';

import { CustomTodoComponentInterface } from './custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-edit',
    templateUrl: './todo-list-item-edit.component.html',
    styleUrls: ['./todo-list-item-edit.component.css']
})
export class TodoListItemEditComponent implements OnInit, AfterViewInit, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    @Output()
    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    initialTodoTitle: string;

    @ViewChild('editedTodo') private editedTodoElementRef: ElementRef;

    constructor() { }

    ngOnInit() {
        this.initialTodoTitle = this.todo.title;
    }

    ngAfterViewInit() {
        this.editedTodoElementRef.nativeElement.focus();    // To set focus to the input when the component showed
    }

    toggleTodoComplete(todo: ToDo) {
        //
    }

    editTodo(todo: ToDo) {
        //
    }

    updateTodo(todo: ToDo) {
        this.editedTodoElementRef.nativeElement.blur();    // Imitate lost focus event
    }

    removeTodo(todo: ToDo) {    // TODO: Perform confirmation for deletion
        console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemEditComponent');
        this.removeTodoListItemEmitter.emit(todo);
    }

    cancelEditTodo() {
        this.todo.title = this.initialTodoTitle;
        this.editedTodoElementRef.nativeElement.blur();    // Imitate lost focus event
    }

    stopEditTodo() {

        if (this.todo.title) {
            this.todo.title = this.todo.title.trim();
            this.updateTodoListItemEmitter.emit(this.todo);    // Emit the update event to Parent Component
        } else {
            this.removeTodo(this.todo);
        }

    }

}
