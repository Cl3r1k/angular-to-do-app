import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';
import { ModalService } from '@app/_services/modal.service';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

    todos: ToDo[] = [];
    todo: ToDo = null;
    allTodosAmount: number;
    activeTodosAmount: number;
    completedTodosAmount: number;
    allCompleted: boolean;                    // The variable is for toggleAll checkbox
    modalId = 'todoModal';
    titleModal = '';
    activeRouteState = 0;
    clearHoverState = false;
    toggleAllHoverState = false;

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token 'TodoDataService'
    // and assign it to a property called _todoDataService
    constructor(private _todoService: TodoService, private _route: ActivatedRoute, public _modalService: ModalService) { }

    public ngOnInit() {
        this._route.data
            .map((data) => data['todos'])
            .subscribe(
            (todos) => {
                // console.log('this._route.params: ', this._route.params);
                // console.log('this._route.queryParams: ', this._route.queryParams);
                console.log('incoming data from resolver', todos);
                this.todos = todos;
                if (this._route.routeConfig.path.endsWith('active')) {
                    this.activeRouteState = 1;
                } else if (this._route.routeConfig.path.endsWith('completed')) {
                    this.activeRouteState = 2;
                } else {
                    this.activeRouteState = 0;
                }
                this.updateFooterAndToggleAllInfo();
            }
            );
    }

    ngOnDestroy() {
        console.log('Do not forget to Unsubscribe!');
        // this._route.data.unsubscribe();
        // this.todos.unsubscribe();
    }

    // Method to handle event emitted by TodoListHeaderComponent
    onAddTodo(todo: ToDo) {
        this._todoService.addTodo(todo).subscribe((newTodo) => {
            if (this.activeRouteState !== 2) {
                this.todos = this.todos.concat(newTodo);
            }
            this.updateFooterAndToggleAllInfo();
        });
    }

    // Service is now available as this._todoService
    onToggleTodoComplete(todo: ToDo) {
        this._todoService.toggleTodoComplete(todo).subscribe((updatedTodo) => {
            todo = updatedTodo;
            if (todo.complete) {
                if (this.activeRouteState === 1) {
                    this.todos = this.todos.filter((val) => val.id !== todo.id);
                }
            } else {
                if (this.activeRouteState === 2) {
                    this.todos = this.todos.filter((val) => val.id !== todo.id);
                }
            }
            this.updateFooterAndToggleAllInfo();
        });
    }

    // Method to handle event emitted by TodoListComponent
    onRemoveTodo(todo: ToDo) {
        this.todo = todo;
        this._modalService.open(this.modalId);
    }

    // Additional method to perform deletion after modal confirmation
    removeTodo(todo: ToDo) {
        console.log('removeTodo emited evt removeTodoListItemEmitter from TodoListItemView with ttl: %s (id: %d)' + todo.title, todo.id);
        this._todoService.deleteTodoById(todo.id).subscribe((_) => {
            this.todo = _;
            this.todos = this.todos.filter((val) => val.id !== todo.id);
            this.updateFooterAndToggleAllInfo();
        });

        this._modalService.close(this.modalId, true);
    }

    // Method to handle event emitted by TodoListComponent
    onUpdateTodo(todo: ToDo) {
        this._todoService.updateTodo(todo).subscribe((updatedTodo) => {
            todo = updatedTodo;
        });
    }

    onToggleAll(toggleState: boolean) {
        console.log('toggleState() called');
        this._todoService.toggleAll(toggleState, this.activeRouteState).subscribe((todos) => {
            console.log('in onToggleAll incoming todos:', todos);
            this.todos = todos;
            this.updateFooterAndToggleAllInfo();
        });
    }

    updateFooterAndToggleAllInfo() {
        console.log('updateFooterAndToggleAllInfo() called');
        this._todoService.getTodosAmountObject().subscribe((todosAmountObject) => {
            this.allTodosAmount = todosAmountObject['all'];
            this.activeTodosAmount = todosAmountObject['active'];
            this.completedTodosAmount = todosAmountObject['complete'];
            this.allCompleted = this.allTodosAmount === this.completedTodosAmount;
        });
    }

    // Method to handle event emitted by TodoListFooterComponent
    onClearCompleted(clearState: boolean) {
        console.log('onClearCompleted (remove %s in TodoListFooterComponent and in current method): ', clearState);
        this._todoService.clearCompleted(this.activeRouteState).subscribe((todos) => {
            this.todos = todos;
            this.updateFooterAndToggleAllInfo();
            this.onClearHoverSetState(false);
        });
    }

    onClearHoverSetState(clearCompletetHoverState: boolean) {
        // tslint:disable-next-line:max-line-length
        // console.log('onClearHoverSetState emited evt clearHoverStateTodoListItemEmitter from TodoListItemView with state: ', clearCompletetHoverState);
        this.clearHoverState = clearCompletetHoverState;
    }

    onToggleAllHoverSetState(toggleAllHoverState: boolean) {
        // tslint:disable-next-line:max-line-length
        // console.log('onToggleAllHoverSetState emited evt toggleAllHoverStateTodoListHeaderEmitter from TodoListItemView with state: ', toggleAllHoverState);
        this.toggleAllHoverState = toggleAllHoverState;
    }

    onMoveTodo(moveState: Object) {
        console.log('onMoveTodo (in TodoListComponent and) in current method moveState is: ', moveState);
        this._todoService.moveTodo(moveState, this.activeRouteState).subscribe((todos) => {
            console.log('in onMoveTodo incoming todos:', todos);
            this.todos = todos;
        });
    }

}
