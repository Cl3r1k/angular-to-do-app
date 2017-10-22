import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Injector,
    Input,
    OnInit,
    Output,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ToDo } from './../../to-do';

import { TableComponent } from './dynamic2/table/table.component';
import { DetailsComponent } from './dynamic2/details/details.component';

import { CustomTodoComponentInterface } from './dynamic2/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-edit',
    templateUrl: './todo-list-item-edit.component.html',
    styleUrls: ['./todo-list-item-edit.component.css'],
    entryComponents: [DetailsComponent, TableComponent]
})
export class TodoListItemEditComponent implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    resultTodo: ToDo;

    currentComponent = null;

    @Input() todo: ToDo;

    @Output()
    toggleCompleteEventTodoListItemEdit: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    removeEventTodoListItemEdit: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoEventTodoListItemEdit: EventEmitter<ToDo> = new EventEmitter();

    constructor(private _injector: Injector, private _factoryResolver: ComponentFactoryResolver) {
        this.todo = this._injector.get('todo');
        console.log('in TodoListItemEditComponent accepted todo.title: ' + this.todo.title);
    }

    ngOnInit() {
    }

    private loadComponent(type: Type<CustomTodoComponentInterface>, todo: ToDo) {
        const componentFactory = this._factoryResolver.resolveComponentFactory(type);
        const componentRef = this.container.createComponent(componentFactory);
        const instanceComponent = (<CustomTodoComponentInterface>componentRef.instance);

        instanceComponent.todo = todo;
        instanceComponent.toggleCompleteTodoListItemEmiter.subscribe(incomeTodo => {
            this.resultTodo = incomeTodo;
        });

        // Destroy the previosly created component
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.currentComponent = componentRef;
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

    createListComponent() {
        this.loadComponent(DetailsComponent, this.todo);
    }

    createTableComponent() {
        this.loadComponent(TableComponent, this.todo);
    }

}
