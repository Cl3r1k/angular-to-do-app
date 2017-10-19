import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ToDo } from './../../to-do';

@Component({
    selector: 'app-todo-list-item-edit',
    templateUrl: './todo-list-item-edit.component.html',
    styleUrls: ['./todo-list-item-edit.component.css']
})
export class TodoListItemEditComponent implements OnInit {

    @Input() todo: ToDo;

    @Output()
    removeEventTodoListItemEdit: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleCompleteEventTodoListItemEdit: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoEventTodoListItemEdit: EventEmitter<ToDo> = new EventEmitter();

    // constructor(private _injector: Injector) {
    //     this.todo = this._injector.get('todo');
    //     console.log('in TodoListItemEditComponent accepted todo.title: ' + this.todo.title);
    // }

    constructor() { }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteEventTodoListItemEdit.emit(todo);
    }

    removeTodo(todo: ToDo) {
        this.removeEventTodoListItemEdit.emit(todo);
    }

    updateTodo(todo: ToDo) {
        this.updateTodoEventTodoListItemEdit.emit(todo);    // Emit the event to TodoListComponent
    }

}
