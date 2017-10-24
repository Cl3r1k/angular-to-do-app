import { Component, Input, Output, OnInit, EventEmitter, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ToDo } from './../to-do';

// Dynamically created components
import { TodoListItemViewComponent } from './../todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListItemEditComponent } from './../todo-list-item/todo-list-item-edit/todo-list-item-edit.component';

// Interface for dynamic components
import { CustomTodoComponentInterface } from './todo-list-item-edit/dynamic2/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item',
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.css'],
    entryComponents: [TodoListItemViewComponent, TodoListItemEditComponent]
})
export class TodoListItemComponent implements OnInit {

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    currentComponent = null;

    @Input() todo: ToDo;

    @Output()
    removeEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleCompleteEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoEventTodoListItem: EventEmitter<ToDo> = new EventEmitter();

    componentData = null;    // Component info wich will be created dynamically

    constructor(private _factoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.createViewComponent();
    }

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

    private createComponent(type: Type<CustomTodoComponentInterface>, todo: ToDo) {
        const componentFactory = this._factoryResolver.resolveComponentFactory(type);
        const componentRef = this.container.createComponent(componentFactory);
        const instanceComponent = (<CustomTodoComponentInterface>componentRef.instance);

        instanceComponent.todo = todo;

        // TODO: Остановился здесь, доделать обработку методов редактирования Todo
        // FIXME: Баг при добавление пустой задачи
        // TODO: При редактировании, если измененное имя пустое, то удалять задачу (с запросом)

        instanceComponent.toggleCompleteTodoListItemEmitter.subscribe(incomeTodo => {
            this.toggleTodoComplete(incomeTodo);
        });

        instanceComponent.editTodoListItemEmitter.subscribe(incomeTodo => {
            //
        });

        instanceComponent.updateTodoListItemEmitter.subscribe(incomeTodo => {
            //
        });

        instanceComponent.removeTodoListItemEmitter.subscribe(incomeTodo => {
            this.removeTodo(incomeTodo);
        });

        // Destroy the previosly created component
        if (this.currentComponent) {
            this.currentComponent.destroy();
            console.log('currentComponent destroyed');
        }

        this.currentComponent = componentRef;
    }

    createViewComponent() {
        this.createComponent(TodoListItemViewComponent, this.todo);
    }

    createEditComponent() {
        this.createComponent(TodoListItemEditComponent, this.todo);
    }

    // createHelloWorldComponent(todo: ToDo) {
    //     this.componentData = {
    //         component: HelloWorldComponent,
    //         inputs: {
    //             todo: todo
    //         }
    //     };
    // }

    // createWorldHelloComponent() {
    //     this.componentData = {
    //         component: WorldHelloComponent,
    //         inputs: {
    //             transferedData: '2'
    //         }
    //     };
    // }

    // createTodoListItemViewComponent(todo: ToDo) {
    //     this.componentData = {
    //         component: TodoListItemViewComponent,
    //         inputs: {
    //             todo: todo
    //         }
    //     };
    // }

    // createTodoListItemEditComponent(todo: ToDo) {
    //     this.componentData = {
    //         component: TodoListItemEditComponent,
    //         inputs: {
    //             todo: todo
    //         }
    //     };
    // }

}
