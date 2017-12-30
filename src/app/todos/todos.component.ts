import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';
import { ModalService } from '@app/_services/modal.service';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {

    todos: ToDo[] = [];
    todo: ToDo = null;
    allTodosAmount: number;
    activeTodosAmount: number;
    completedTodosAmount: number;
    modalId = 'todoModal';
    titleModal = '';
    activeRouteState = 0;

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
                this.updateFooterInfo();
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
            this.updateFooterInfo();
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
        console.log('removeTodo emited evt removeTodoListItemEmitter from TodoListItemView with ttl: %s (id: %d)' + todo.title, todo.id);
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
        this._todoService.toggleAll(state).subscribe((todos) => {
            console.log('incoming todos:', todos);
            this.todos = todos;
            this.updateFooterInfo();
            console.log('after incoming todo list is:', this.todos);
        });
    }

    updateFooterInfo() {
        console.log('updateFooterInfo() called');
        this._todoService.getAllTodos(0).subscribe((dataAllTodos) => {
            this.allTodosAmount = dataAllTodos.length;
            this.activeTodosAmount = dataAllTodos.filter((item) => !item.complete).length;
            this.completedTodosAmount = dataAllTodos.filter((item) => item.complete).length;
        });
    }

    // Method to handle event emitted by TodoListFooterComponent
    onClearCompleted(state: boolean) {
        console.log('Clear completed tasks (remove state in TodoListFooterComponent and in current method): ', state);
        this._todoService.clearCompleted(this.activeRouteState).subscribe((todos) => {
            this.todos = todos;
            this.updateFooterInfo();
        });
    }

}
