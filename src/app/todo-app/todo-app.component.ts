import { Component } from '@angular/core';
import { TodoService } from './../todo.service';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent {

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token 'TodoDataService'
    // and assign it to a property called _todoDataService
    constructor(private _todoService: TodoService) { }

    // Service is now available as this._todoDataService
    onToggleTodoComplete(todo: ToDo) {
        this._todoService.toggleTodoComplete(todo);
    }

    // Method to handle event emitted by TodoListHeaderComponent
    onAddTodo(todo: ToDo) {
        this._todoService.addTodo(todo);
    }

    onRemoveTodo(todo: ToDo) {
        this._todoService.deleteTodoById(todo.id);
    }

    get todos() {
        return this._todoService.getAllTodos();
    }

}
