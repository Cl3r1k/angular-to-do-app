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

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

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

    private createComponent(type: Type<CustomTodoComponentInterface>, todo: ToDo) {
        const componentFactory = this._factoryResolver.resolveComponentFactory(type);
        const componentRef = this.container.createComponent(componentFactory);
        const instanceComponent = (<CustomTodoComponentInterface>componentRef.instance);

        instanceComponent.todo = todo;
        console.log('BEFORE subscribe instanceComponent.todo.title: ' + instanceComponent.todo.title
            + ' todoTmp.title: ' + todo.title);
        instanceComponent.toggleCompleteTodoListItemEmiter.subscribe(incomeTodo => {
            // this.resultTodo = incomeTodo;
            console.log('BEFORE instanceComponent.todo.title: ' + instanceComponent.todo.title
                + ' todoTmp.title: ' + todo.title);
            console.log('incomeTodo.title: ' + incomeTodo.title);
            console.log('AFTER instanceComponent.todo.title: ' + instanceComponent.todo.title
                + ' todoTmp.title: ' + todo.title);
        });

        // Destroy the previosly created component
        if (this.currentComponent) {
            this.currentComponent.destroy();
            console.log('currentComponent destroyed');
        }

        this.currentComponent = componentRef;
    }

    /* TODO: Остановился на том, что теперь нужно изменить интерфейс, реализовать его в компонентах
    TodoListItemViewComponent и TodoListItemEditComponent, изменить компонент TodoListItemComponent для загрузки
    данамических компонентов.
    */

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteEventTodoListItemEdit.emit(todo);
    }

    removeTodo(todo: ToDo) {
        this.removeEventTodoListItemEdit.emit(todo);
    }

    updateTodo(todo: ToDo) {
        this.updateTodoEventTodoListItemEdit.emit(todo);    // Emit the event to Parent Component
    }

    createListComponent() {
        this.createComponent(DetailsComponent, this.todo);
    }

    createTableComponent() {
        this.createComponent(TableComponent, this.todo);
    }

}
