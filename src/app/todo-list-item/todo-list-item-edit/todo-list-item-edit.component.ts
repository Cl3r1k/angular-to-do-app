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
        this.editedTodoElementRef.nativeElement.focus();
    }

    toggleTodoComplete(todo: ToDo) {
        //
    }

    editTodo(todo: ToDo) {
        //
    }

    updateTodo(todo: ToDo) {
        if (todo.title) {
            this.todo.title = this.todo.title.trim();
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
        this.editedTodoElementRef.nativeElement.blur();    // Imitate lost focus event
    }

    stopEditTodo(todo: ToDo) {
        this.todo.title = this.initialTodoTitle;
        this.updateTodoListItemEmitter.emit(this.todo);
    }

}
