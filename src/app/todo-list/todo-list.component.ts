import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from './../to-do';

import { HelloWorldComponent } from './../todo-list-item-edit/hello-world/hello-world.component';
import { WorldHelloComponent } from './../todo-list-item-edit/world-hello/world-hello.component';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

    @Input()
    todos: ToDo[];

    @Output()
    removeEventTodoList: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleCompleteEventTodoList: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoEventTodoList: EventEmitter<ToDo> = new EventEmitter();

    componentData = null;    // Component info wich will be created dynamically

    constructor() { }

    onToggleTodoComplete(todo: ToDo) {
        this.toggleCompleteEventTodoList.emit(todo);
    }

    onRemoveTodo(todo: ToDo) {
        this.removeEventTodoList.emit(todo);
    }

    updateTodo(todo: ToDo) {
        // console.log('updateTodo in TodoListComponent - pushing todo with title: ' + todo.title + ' to UP');  // TODO: Delete this string
        this.updateTodoEventTodoList.emit(todo);    // Emit the event to TodosComponent
    }

    onEditTodo(todo: ToDo) {
        console.log('event accepted from TodoListItemComp and should pass the todo with title: ' + todo.title + ' to TodoListItemEditComp');
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
