import { Component, OnInit } from '@angular/core';
import { TodoService } from '@app/services/todo.service';
import { ToDo } from '@app/to-do';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

    todos: ToDo[] = [];
    incompletedTodosCount: number;

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token 'TodoDataService'
    // and assign it to a property called _todoDataService
    constructor(private _todoService: TodoService, private _route: ActivatedRoute) { }

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
        this._todoService.deleteTodoById(todo.id).subscribe((_) => {
            this.todos = this.todos.filter((val) => val.id !== todo.id);
            this.updateFooterInfo();
        });
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

}
