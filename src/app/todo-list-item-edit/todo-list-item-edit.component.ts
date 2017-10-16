import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from './../to-do';

import { HelloWorldComponent } from './../todo-list-item-edit/hello-world/hello-world.component';
import { WorldHelloComponent } from './../todo-list-item-edit/world-hello/world-hello.component';


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
    updateTodoEventTodoListItemEdit: EventEmitter<ToDo> = new EventEmitter();    // Rename the emitters

    componentData = null;

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

    createHelloWorldComponent() {
        this.componentData = {
            component: HelloWorldComponent,
            inputs: {
                showNum: 9
            }
        };
    }

    createWorldHelloComponent() {
        this.componentData = {
            component: WorldHelloComponent,
            inputs: {
                showNum: 2
            }
        };
    }

}
