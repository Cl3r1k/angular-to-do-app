import { Component, OnInit } from '@angular/core';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';
import { ModalService } from '@app/_services/modal.service';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

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

    // Method to handle event emitted by TodoListHeaderComponent
    onAddTodo(todo: ToDo) {
        this._todoService.addTodo(todo).subscribe((newTodo) => {
            if (this.activeRouteState !== 2) {
                this.todos = this.todos.concat(newTodo);
            }
            this.updateFooterInfo();
        });
    }

    // Service is now available as this._todoDataService
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
        this._todoService.getAllTodos().subscribe((dataAllTodos) => {
            this.allTodosAmount = dataAllTodos.length;
            this.activeTodosAmount = dataAllTodos.filter((item) => !item.complete).length;
            this.completedTodosAmount = dataAllTodos.filter((item) => item.complete).length;
        });
    }

    // Method to handle event emitted by TodoListFooterComponent
    onClearCompleted(state: boolean) {
        console.log('Clear completed tasks: ', state);
        alert('This part is under construction');
        // this._todoService.addTodo(todo).subscribe((newTodo) => {
        //     if (this.activeRouteState !== 2) {
        //         this.todos = this.todos.concat(newTodo);
        //     }
        //     this.updateFooterInfo();
        // });
    }

}
