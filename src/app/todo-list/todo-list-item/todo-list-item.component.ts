import { Component, Input, Output, OnInit, EventEmitter, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

// Dynamically created components
import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListItemEditComponent } from '@app/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';

// Interface for dynamic components
import { CustomTodoComponentInterface } from '@app/_interfaces/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item',
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.scss'],
    entryComponents: [TodoListItemViewComponent, TodoListItemEditComponent]
})
export class TodoListItemComponent implements OnInit {

    @ViewChild('container', { read: ViewContainerRef }) _container: ViewContainerRef;

    currentComponent = null;

    @Input() todo: ToDo;

    @Output()
    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    componentData = null;    // Component info wich will be created dynamically

    constructor(private _factoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.createViewComponent(this.todo);
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    updateTodo(todo: ToDo) {
        this.updateTodoListItemEmitter.emit(todo);    // Emit the update event to the Parent component
    }

    removeTodo(todo: ToDo) {
        console.log('removeTodo emited evt removeEventTodoListItem from TodoListItemComponent with ttl: %s (id: %d)', todo.title, todo.id);
        this.removeTodoListItemEmitter.emit(todo);
    }

    private createComponent(type: Type<CustomTodoComponentInterface>, todo: ToDo) {
        const componentFactory = this._factoryResolver.resolveComponentFactory(type);
        const componentRef = this._container.createComponent(componentFactory);
        const instanceComponent = (<CustomTodoComponentInterface>componentRef.instance);

        instanceComponent.todo = todo;    // Pass todo to childrenComponent

        instanceComponent.toggleCompleteTodoListItemEmitter.subscribe(incomeTodo => {
            this.toggleTodoComplete(incomeTodo);
        });

        instanceComponent.editTodoListItemEmitter.subscribe(incomeTodo => {
            // The event from TodoListItemViewComponent
            this.createEditComponent(incomeTodo);
        });

        instanceComponent.updateTodoListItemEmitter.subscribe(incomeTodo => {
            // The event from TodoListItemEditComponent
            this.updateTodo(incomeTodo);
            this.createViewComponent(this.todo);
        });

        instanceComponent.cancelTodoListItemEmitter.subscribe(isCanceled => {
            // The event from TodoListItemEditComponent
            this.createViewComponent(this.todo);
        });

        instanceComponent.removeTodoListItemEmitter.subscribe(incomeTodo => {
            this.removeTodo(incomeTodo);
        });

        // Destroy the previosly created component
        if (this.currentComponent) {
            // console.log('currentComponent (' + this.currentComponent.location.nativeElement.nodeName + ') destroyed');
            this.currentComponent.destroy();
        }

        this.currentComponent = componentRef;
    }

    createViewComponent(todo: ToDo) {
        this.createComponent(TodoListItemViewComponent, todo);
    }

    createEditComponent(todo: ToDo) {
        this.createComponent(TodoListItemEditComponent, todo);
    }

}
