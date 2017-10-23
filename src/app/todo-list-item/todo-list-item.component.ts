import { Component, Input, Output, EventEmitter, Injector } from '@angular/core';
import { ToDo } from './../to-do';

// Dynamically created components
import { TodoListItemViewComponent } from './../todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListItemEditComponent } from './../todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { HelloWorldComponent } from './../todo-list-item/hello-world/hello-world.component';
import { WorldHelloComponent } from './../todo-list-item/world-hello/world-hello.component';

@Component({
    selector: 'app-todo-list-item',
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {

    @Input() todo: ToDo;

    @Output()
    removeEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleCompleteEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    componentData = null;    // Component info wich will be created dynamically

    constructor() { }

    emitedNumber(num: number) {
        alert('emited number from dynamic component is: ' + num);
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteEventTodoListItem.emit(todo);
    }

    removeTodo(todo: ToDo) {
        console.log('removeTodo emit event removeEventTodoListItem from TodoListItemComponent');
        this.removeEventTodoListItem.emit(todo);
    }

    editTodo(todo: ToDo) {
        alert('edit todo with title: ' + this.todo.title);
        this.editTodoEventTodoListItem.emit(todo);    // Emit the event to Parent component
    }

    createHelloWorldComponent(todo: ToDo) {
        this.componentData = {
            component: HelloWorldComponent,
            inputs: {
                todo: todo
            }
        };
    }

    createWorldHelloComponent() {
        this.componentData = {
            component: WorldHelloComponent,
            inputs: {
                transferedData: '2'
            }
        };
    }

    createTodoListItemViewComponent(todo: ToDo) {
        this.componentData = {
            component: TodoListItemViewComponent,
            inputs: {
                todo: todo
            }
        };
    }

    createTodoListItemEditComponent(todo: ToDo) {
        this.componentData = {
            component: TodoListItemEditComponent,
            inputs: {
                todo: todo
            }
        };
    }

}
