import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ToDo } from './../../to-do';

@Component({
    selector: 'app-todo-list-item-view',
    templateUrl: './todo-list-item-view.component.html',
    styleUrls: ['./todo-list-item-view.component.css']
})
export class TodoListItemViewComponent implements OnInit {

    @Input() todo: ToDo;

    @Output()
    toggleCompleteEventTodoListItemView: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    removeEventTodoListItemView: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoEventTodoListItemView: EventEmitter<ToDo> = new EventEmitter();

    constructor(private _injector: Injector) {
        this.todo = this._injector.get('transferedData');
        console.log('in TodoListItemViewComponent accepted todo.title: ' + this.todo.title);
    }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteEventTodoListItemView.emit(todo);
    }

    removeTodo(todo: ToDo) {
        this.removeEventTodoListItemView.emit(todo);
    }

    editTodo(todo: ToDo) {
        alert('edit todo with title: ' + this.todo.title);
        this.editTodoEventTodoListItemView.emit(todo);    // Emit the event to TodoListComponent
    }

}
