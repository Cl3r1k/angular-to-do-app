import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

// Services
import { TodoService } from '@app/_services/todo.service';
import { TodoOrderService } from '@app/_services/todo-order.service';

// Routes
import { ActivatedRoute } from '@angular/router';

// Components
import { DialogDeleteComponent } from '@app/dialog/dialog-delete/dialog-delete.component';
import { DialogMoreComponent } from '@app/dialog/dialog-more/dialog-more.component';

// Modules
import { MatDialog } from '@angular/material';
import 'hammerjs';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

    todos: ToDo[] = [];
    todo: ToDo = null;
    todosToView: [ToDo[]] = [[]];
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
    constructor(private _todoService: TodoService,
        private _route: ActivatedRoute,
        public dialog: MatDialog,
        private _todoOrderService: TodoOrderService) { }

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
                    this.transformView();
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
            this.updateOrder();
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

    // Method to handle event emitted by TodoListComponent and call DialogDelete
    onRemoveTodo(todo: ToDo) {
        this.todo = todo;

        const dataForDialog = {
            dialogTitle: 'Delete Todo',
            contentTitle: 'Are you sure want to delete todo with name:',
            contentData: todo.title
        };

        const dialogRef = this.dialog.open(DialogDeleteComponent, {
            width: '600px',
            data: {
                data: dataForDialog
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Confirm') {
                this.removeTodo(todo);    // User confirmed action, call 'removeTodo()'
            } else {
                // User clicked 'Cancel' or clicked outside of the dialog
            }
        });
    }

    // Additional method to perform deletion after modal confirmation
    removeTodo(todo: ToDo) {
        console.log('removeTodo emited evt removeTodoListItemEmitter from TodoListItemView with ttl: %s (id: %d)' + todo.title, todo.id);
        this._todoService.deleteTodoById(todo.id).subscribe((_) => {
            this.todo = _;
            this.todos = this.todos.filter((val) => val.id !== todo.id);
            this.updateOrder();
            this.updateFooterAndToggleAllInfo();
        });
    }

    onUpdateTodo(todo: ToDo) {
        this._todoService.updateTodo(todo).subscribe((updatedTodo) => {
            // todo = updatedTodo;        // We even do not need to update inner todo
        });
    }

    // Method to handle event emitted by TodoListComponent and call DialogMore
    onMoreTodo(todo: ToDo) {
        // Call dialog with name 'Advanced settings'

        const dataForDialog = {
            dialogTitle: 'Advanced settings',
            todoCost: todo.costedPomo,
            estimatedTodos: todo.estimatedPomos,
            remind: todo.remindMe,
            remindTime: todo.remindTime,
            note: todo.note
        };

        const dialogRef = this.dialog.open(DialogMoreComponent, {
            width: '400px',
            data: {
                data: dataForDialog
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && (result['dialogResult'] === 'ConfirmSave' || result['dialogResult'] === 'ConfirmDelete')) {
                // User confirmed actions, call 'removeTodo()' or 'onUpdateTodo()'
                if (result['dialogResult'] === 'ConfirmDelete') {
                    this.removeTodo(todo);
                } else {
                    console.log('in TodosComponent in onMoreTodo() result: ', result);

                    todo.costedPomo = result['todoCost'];
                    todo.estimatedPomos = result['estimatedTodos'];
                    todo.remindMe = result['remind'];
                    todo.remindTime = result['remindTime'];
                    todo.note = result['note'];

                    this.onUpdateTodo(todo);    // Save changes by calling 'onUpdateTodo()'
                }
            } else {
                // User clicked 'Cancel' or clicked outside of the dialog
            }
        });
    }

    onPinTodo(todo: ToDo) {
        this._todoService.pinTodo(todo, this.todos).subscribe((updatedTodos) => {
            // todo = updatedTodo;        // We even do not need to update inner todo
            console.log('in onPinTodo updatedTodos: ', updatedTodos);
            this.todos = updatedTodos;
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

    // Method to handle event emitted by TodoListFooterComponent and call Dialog
    onClearCompleted(clearState: boolean) {
        const dataForDialog = {
            dialogTitle: 'Delete Todos',
            contentTitle: 'Are you sure want to delete todos amount: ',
            contentData: this.todos.filter(todo => todo.complete === true).length,
            isClearCompleted: true
        };

        const dialogRef = this.dialog.open(DialogDeleteComponent, {
            width: '600px',
            data: {
                data: dataForDialog
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Confirm') {
                this.clearCompleted(clearState);    // User confirmed action, call 'clearCompleted()'
            } else {
                // User clicked 'Cancel' or clicked outside of the dialog
            }
        });
    }

    clearCompleted(clearState: boolean) {
        console.log('onClearCompleted (remove %s in TodoListFooterComponent and in current method): ', clearState);
        this._todoService.clearCompleted(this.activeRouteState).subscribe((todos) => {
            this.todos = todos;
            // this.updateOrder();    // Order was updated previously in service
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
        // this._todoService.moveTodo(moveState, this.activeRouteState).subscribe((todos) => {
        //     console.log('in onMoveTodo incoming todos:', todos);
        //     this.todos = todos;
        // });

        this.updateOrder();
    }

    updateOrder() {

        const todoOrderList = this.todos.map(todo => {
            return todo.inner_id;
        });

        const updatedOrder = this._todoOrderService.updateOrder(todoOrderList);
    }

    transformView() {
        let pinnedTodos: ToDo[];
        let unpinnedTodos: ToDo[];
        let completedTodos: ToDo[];

        pinnedTodos = this.todos.filter(todo => {
            return !todo.complete && todo.pin;
        });

        unpinnedTodos = this.todos.filter(todo => {
            return !todo.complete && !todo.pin;
        });

        completedTodos = this.todos.filter(todo => {
            return todo.complete;
        });

        this.todosToView[0] = pinnedTodos;
        this.todosToView.push(unpinnedTodos);
        this.todosToView.push(completedTodos);

        console.log('%cpinnedTodos', 'color: salmon;', pinnedTodos);
        console.log('%cpinnedTodos', 'color: salmon;', unpinnedTodos);
        console.log('%cpinnedTodos', 'color: salmon;', completedTodos);
    }

}
