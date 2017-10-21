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

import { CustomComponent } from './dynamic2/custom-component';

@Component({
    selector: 'app-todo-list-item-edit',
    templateUrl: './todo-list-item-edit.component.html',
    styleUrls: ['./todo-list-item-edit.component.css']
})
export class TodoListItemEditComponent implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    results = 0;

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
        this.loadComponent(DetailsComponent, [
            { detail: 'List item 1' },
            { detail: 'List item 2' },
            { detail: 'List item 3' }
        ]);

        this.loadComponent(TableComponent, [
            { name: 'Item 1', description: 'Description 1' },
            { name: 'Item 2', description: 'Description 2' },
        ]);
    }

    private loadComponent(type: Type<CustomComponent>, data: any) {
        const componentFactory = this._factoryResolver.resolveComponentFactory(type);
        const componentRef = this.container.createComponent(componentFactory);
        const inst = (<CustomComponent>componentRef.instance);

        inst.data = data;
        inst.updateEmitter.subscribe(incomeData => {
            this.results += incomeData;
        });
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
