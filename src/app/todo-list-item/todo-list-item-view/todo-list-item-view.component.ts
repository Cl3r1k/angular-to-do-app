import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from './../../to-do';

import { CustomTodoComponentInterface } from './../todo-list-item-edit/custom-todo-component-interface';

// Testing components
import { HelloComponent } from './../todo-list-item-view/hello/hello.component';
import { WorldComponent } from './../todo-list-item-view/world/world.component';

@Component({
    selector: 'app-todo-list-item-view',
    templateUrl: './todo-list-item-view.component.html',
    styleUrls: ['./todo-list-item-view.component.css'],
    entryComponents: [HelloComponent, WorldComponent]
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
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    editTodo(todo: ToDo) {
        console.log('editTodo called in TodoListItemViewComponent with title: ' + this.todo.title);
        this.editTodoListItemEmitter.emit(todo);    // Emit the editTodoListItemEmitter event to Parent component
    }

    updateTodo(todo: ToDo) {
        //
    }

    removeTodo(todo: ToDo) {
        console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemViewComponent');
        this.removeTodoListItemEmitter.emit(todo);
    }

    // TODO: Остановился здесь, переделать динамические компоненты на NgComponentOutlet
    // tslint:disable-next-line:member-ordering
    dynamicComponent;

    createHelloComponent() {
        this.dynamicComponent = HelloComponent;
    }

    createWorldComponent() {
        this.dynamicComponent = WorldComponent;
    }

}
