import { Component, Injector, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomTodoComponentInterface } from './../todo-list-item-edit/dynamic2/custom-todo-component-interface';
import { ToDo } from './../../to-do';

@Component({
    selector: 'app-hello-world',
    template: `
    <p>hello-world works! {{transferedData}}</p>
    <label>{{transferedData.title}}</label>
    <button (click)='toggleTodoComplete(transferedData)'>Send data from HelloWorldComponent</button>
    `
})
export class HelloWorldComponent implements OnInit, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    @Output() toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output() editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output() updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output() removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    transferedData: ToDo;

    constructor(private _injector: Injector) {
        this.transferedData = this._injector.get('todo');
        console.log('transferedData: ' + this.transferedData);
    }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    editTodo(todo: ToDo) {
        throw new Error('Method not implemented.');
    }
    updateTodo(todo: ToDo) {
        throw new Error('Method not implemented.');
    }
    removeTodo(todo: ToDo) {
        throw new Error('Method not implemented.');
    }

}
