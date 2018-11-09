import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

// Services
import { TodoService } from '@app/_services/todo.service';
import { TodoOrderService } from '@app/_services/todo-order.service';
import { AuthService } from '@app/_services/auth.service';

// Routes
import { ActivatedRoute, Router } from '@angular/router';

// Components
import { DialogDeleteComponent } from '@app/dialog/dialog-delete/dialog-delete.component';
import { DialogMoreComponent } from '@app/dialog/dialog-more/dialog-more.component';

// Imports
import { map } from 'rxjs/operators';

// Modules
import { MatDialog } from '@angular/material';
import 'hammerjs';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

    consoleTextColorComponent = 'color: cadetblue;';

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
    hashTagToFilter = '';

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token 'TodoDataService'
    // and assign it to a property called _todoDataService
    constructor(private _todoService: TodoService,
        private _route: ActivatedRoute,
        public dialog: MatDialog,
        private _todoOrderService: TodoOrderService,
        private _authService: AuthService,
        private _router: Router) { }

    public ngOnInit() {
        this._route.data.pipe(
            map((data) => data['resolverData'])
        ).subscribe(
            (resolverData) => {
                // console.log(`%c'TodosComponent' _route.params: `, this.consoleTextColorComponent, this._route.params);
                // console.log(`%c'TodosComponent' _route.queryParams: `, this.consoleTextColorComponent, this._route.queryParams);
                // console.log(`%c'TodosComponent' routeConfig.path: `, this.consoleTextColorComponent, this._route.routeConfig.path);

                // console.log(`%cincoming 'resolverData' from resolver: `, this.consoleTextColorComponent, resolverData);
                this.activeRouteState = resolverData.activeRouteState;
                this.hashTagToFilter = resolverData.params;
                this.todos = resolverData.todos;

                this.transformView();
                this.updateFooterAndToggleAllInfo();
            }
        );
    }

    ngOnDestroy() {
        console.log('%cDo not forget to Unsubscribe!', this.consoleTextColorComponent);
        // this._route.data.unsubscribe();
        // this.todos.unsubscribe();
    }

    // Method to handle event emitted by TodoListHeaderComponent
    onAddTodo(todo: ToDo) {
        this._todoService.addTodo(todo, this.todos).subscribe((updatedTodos) => {
            console.log('%cin onAddTodo() updatedTodos: ', this.consoleTextColorComponent, updatedTodos);
            this.todos = updatedTodos;
            this.transformView();
            this.updateFooterAndToggleAllInfo();
        });
    }

    // Service is now available as this._todoService
    onToggleTodoComplete(todo: ToDo) {
        // this._todoService.toggleTodoComplete(todo).subscribe((updatedTodo) => {
        //     todo = updatedTodo;
        //     if (todo.complete) {
        //         if (this.activeRouteState === 1) {
        //             this.todos = this.todos.filter((val) => val.id !== todo.id);
        //         }
        //     } else {
        //         if (this.activeRouteState === 2) {
        //             this.todos = this.todos.filter((val) => val.id !== todo.id);
        //         }
        //     }
        //     this.transformView();
        //     this.updateFooterAndToggleAllInfo();
        // });

        this._todoService.toggleTodoComplete(todo, this.todos).subscribe((updatedTodos) => {
            console.log('%cin onToggleTodoComplete updatedTodos: ', this.consoleTextColorComponent, updatedTodos);
            this.todos = updatedTodos;
            this.transformView();
            this.updateFooterAndToggleAllInfo();
        });
    }

    // Method to handle event emitted by TodoListComponent and call DialogDelete
    onRemoveTodo(todo: ToDo) {
        this.todo = todo;

        const dataForDialog = {
            dialogTitle: 'Delete Todo',
            contentTitle: 'Are you sure want to delete todo with name:',
            contentData: todo.title,
            isClearCompleted: false
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
        // tslint:disable-next-line:max-line-length
        console.log('%cremoveTodo emited evt removeTodoListItemEmitter from TodoListItemView with ttl: %s (id: %d)', this.consoleTextColorComponent, todo.title, todo.id);
        this._todoService.deleteTodoById(todo.id).subscribe((_) => {
            this.todo = _;
            this.todos = this.todos.filter((val) => val.id !== todo.id);
            this.updateOrder();
            this.transformView();
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
                    console.log('%cin TodosComponent in onMoreTodo() result: ', this.consoleTextColorComponent, result);

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
            console.log('%cin onPinTodo updatedTodos: ', this.consoleTextColorComponent, updatedTodos);
            this.todos = updatedTodos;
            this.transformView();
        });
    }

    onToggleAll(toggleState: boolean) {
        console.log('%ctoggleState() called', this.consoleTextColorComponent);
        this._todoService.toggleAll(toggleState, this.activeRouteState).subscribe((todos) => {
            console.log('%cin onToggleAll incoming todos:', this.consoleTextColorComponent, todos);
            this.todos = todos;
            this.transformView();
            this.updateFooterAndToggleAllInfo();
        });
    }

    updateFooterAndToggleAllInfo() {
        console.log('%cupdateFooterAndToggleAllInfo() called', this.consoleTextColorComponent);
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
        // tslint:disable-next-line:max-line-length
        console.log('%conClearCompleted (remove %s in TodoListFooterComponent and in current method): ', this.consoleTextColorComponent, clearState);
        this._todoService.clearCompleted(this.activeRouteState).subscribe((todos) => {
            this.todos = todos;
            // this.updateOrder();    // Order was updated previously in service
            this.transformView();
            this.updateFooterAndToggleAllInfo();
            this.onClearHoverSetState(false);
        });
    }

    onClearHoverSetState(clearCompletetHoverState: boolean) {
        // tslint:disable-next-line:max-line-length
        // console.log('%conClearHoverSetState emited evt clearHoverStateTodoListItemEmitter from TodoListItemView with state: ', this.consoleTextColorComponent, clearCompletetHoverState);
        this.clearHoverState = clearCompletetHoverState;
    }

    onToggleAllHoverSetState(toggleAllHoverState: boolean) {
        // tslint:disable-next-line:max-line-length
        // console.log('%conToggleAllHoverSetState emited evt toggleAllHoverStateTodoListHeaderEmitter from TodoListItemView with state: ', this.consoleTextColorComponent, toggleAllHoverState);
        this.toggleAllHoverState = toggleAllHoverState;
    }

    onMoveTodo(todosUpdated: ToDo[]) {
        // tslint:disable-next-line:max-line-length
        console.log('%conMoveTodo (in TodoListComponent and) in current method todosUpdated is: ', this.consoleTextColorComponent, todosUpdated);
        // this._todoService.moveTodo(moveState, this.activeRouteState).subscribe((todos) => {
        //     console.log('%cin onMoveTodo incoming todos:', this.consoleTextColorComponent, todos);
        //     this.todos = todos;
        // });

        this.todos = todosUpdated;
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
            if (this.activeRouteState === 3) {
                return !todo.complete && todo.pin && this.hashtagIsPresent(todo.title, this.hashTagToFilter);
            } else {
                return !todo.complete && todo.pin;
            }
        });

        unpinnedTodos = this.todos.filter(todo => {
            if (this.activeRouteState === 3) {
                // console.log('%cin TodosComponent todo.complete: ', this.consoleTextColorComponent, todo.complete);
                // console.log('%cin TodosComponent todo.pin: ', this.consoleTextColorComponent, todo.pin);
                // console.log('%cin TodosComponent todo.title: ', this.consoleTextColorComponent, todo.title);
                // tslint:disable-next-line:max-line-length
                // console.log('%cin TodosComponent todo.title.indexOf: ', this.consoleTextColorComponent, todo.title.toLowerCase().indexOf(this.hashTagToFilter.toLowerCase()));
                return !todo.complete && !todo.pin && this.hashtagIsPresent(todo.title, this.hashTagToFilter);
            } else {
                return !todo.complete && !todo.pin;
            }
        });

        completedTodos = this.todos.filter(todo => {
            if (this.activeRouteState === 3) {
                return todo.complete && this.hashtagIsPresent(todo.title, this.hashTagToFilter);
            } else {
                return todo.complete;
            }
        });

        this.todosToView = [[]];

        this.todosToView[0] = pinnedTodos;
        this.todosToView.push(unpinnedTodos);
        this.todosToView.push(completedTodos);

        console.log('%cin TodosComponent pinnedTodos', this.consoleTextColorComponent, pinnedTodos);
        console.log('%cin TodosComponent unpinnedTodos', this.consoleTextColorComponent, unpinnedTodos);
        console.log('%cin TodosComponent completedTodos', this.consoleTextColorComponent, completedTodos);
    }

    private hashtagIsPresent(title: string, hashTagToFilter: string): boolean {
        const hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text

        let isPresent = false;
        if (title.match(hashtagsRegExp)) {
            const hashtagsInTitle = title.match(hashtagsRegExp);

            hashtagsInTitle.map(hashtag => {
                if (hashtag.trim() === hashTagToFilter) {
                    isPresent = true;
                }
            });
        }

        return isPresent;
    }

    doSignOut() {
        this._authService.doSignOut();
        this._router.navigate(['/sign-in']);
    }

    containerClickHandler(event) {
        // FEATURE: Here we should check, if there is some edited item -> cancel edit
        if (event.target.className === 'content-container') {
            console.log('%ccontainerClick called with event: ', this.consoleTextColorComponent, event);
        }
    }

}
