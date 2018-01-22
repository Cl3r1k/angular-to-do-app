import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { CustomTodoComponentInterface } from '@app/_interfaces/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-view',
    templateUrl: './todo-list-item-view.component.html',
    styleUrls: ['./todo-list-item-view.component.scss']
})
export class TodoListItemViewComponent implements OnInit, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    @Output()
    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    cancelTodoListItemEmitter: EventEmitter<boolean> = new EventEmitter();

    @Output()
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    deleteHoverState = false;
    editHoverState = false;

    constructor() { }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    editTodo(todo: ToDo) {
        console.log('editTodo called in TodoListItemViewComponent with title: ' + todo.title);
        this.editTodoListItemEmitter.emit(todo);    // Emit the edit event to a Parent component
    }

    updateTodo(todo: ToDo) {
        //
    }

    removeTodo(todo: ToDo) {
        // console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemViewComponent with title: ' + todo.title);
        this.removeTodoListItemEmitter.emit(todo);
    }

    setDeleteHover(state: boolean) {
        this.deleteHoverState = state;
    }

    setEditHover(state: boolean) {
        this.editHoverState = state;
    }

}
