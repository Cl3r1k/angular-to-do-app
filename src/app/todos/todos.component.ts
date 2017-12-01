import { Component, OnInit, AfterViewChecked, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';
import { ModalService } from '@app/_services/modal.service';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, AfterViewChecked, OnChanges, DoCheck {

    todos: ToDo[] = [];
    todo: ToDo = null;
    incompletedTodosCount: number;
    modalId = 'todoModal';
    titleModal = '';

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token 'TodoDataService'
    // and assign it to a property called _todoDataService
    constructor(private _todoService: TodoService, private _route: ActivatedRoute, public _modalService: ModalService) { }

    public ngOnInit() {
        this._route.data
            .map((data) => data['todos'])
            .subscribe(
                (todos) => {
                    this.todos = todos;
                    this.updateFooterInfo();
                }
            );
    }

    // Method to handle event emitted by TodoListHeaderComponent
    onAddTodo(todo: ToDo) {
        this._todoService.addTodo(todo).subscribe((newTodo) => {
            this.todos = this.todos.concat(newTodo);
            this.updateFooterInfo();
        });
    }

    // Service is now available as this._todoDataService
    onToggleTodoComplete(todo: ToDo) {
        this._todoService.toggleTodoComplete(todo).subscribe((updatedTodo) => {
            todo = updatedTodo;
            this.updateFooterInfo();
        });
    }

    // Method to handle event emitted by TodoListComponent
    onRemoveTodo(todo: ToDo) {
        this.todo = todo;
        this._modalService.open(this.modalId);
    }

    // Additional method to perform deletion after modal confirmation
    removeTodo(todo: ToDo) {
        console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemViewComponent with title: ' + todo.title);
        this._todoService.deleteTodoById(todo.id).subscribe((_) => {
            this.todo = _;
            this.todos = this.todos.filter((val) => val.id !== todo.id);
            this.updateFooterInfo();
        });

        this._modalService.close(this.modalId, true);
    }

    // Method to handle event emitted by TodoListComponent
    onUpdateTodo(todo: ToDo) {
        this._todoService.updateTodo(todo).subscribe((updatedTodo) => {
            todo = updatedTodo;
        });
    }

    onToggleAll(state: boolean) {
        // console.log('onToggleAll with todo: ', todo);
    }

    updateFooterInfo() {
        this.incompletedTodosCount = this.todos.filter(todo => !todo.complete).length;
    }

    ngAfterViewChecked(changes: SimpleChanges) {
        console.log('ngAfterViewChecked');
    }

    ngDoCheck() {
        console.log('ngDoCheck');
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('ngOnChanges');
        // tslint:disable-next-line:forin
        // for (const propName in changes) {
        //     const chng = changes[propName];
        //     const cur = JSON.stringify(chng.currentValue);
        //     const prev = JSON.stringify(chng.previousValue);
        //     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        // }
    }

    // The ability, to disable scrolling, when a modal is active
    // showDialogWindow(state: boolean) {
    //     this.showDialog = state;

    //     if (this.showDialog) {
    //         this.renderer.addClass(document.body, 'modal-open');
    //     } else {
    //         this.renderer.removeClass(document.body, 'modal-open');
    //     }
    // }

}
