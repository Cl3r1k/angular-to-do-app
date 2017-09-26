import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {

    todos: ToDo[] = [];

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token 'TodoDataService'
    // and assign it to a property called _todoDataService
    constructor(private _todoService: TodoService) { }

    public ngOnInit() {
        this._todoService.getAllTodos().subscribe((todos) => {
            this.todos = todos;
        });
    }

    // Method to handle event emitted by TodoListHeaderComponent
    onAddTodo(todo: ToDo) {
        this._todoService.addTodo(todo).subscribe((newTodo) => {
            this.todos.concat(newTodo);
        });
    }

    // Service is now available as this._todoDataService
    onToggleTodoComplete(todo: ToDo) {
        this._todoService.toggleTodoComplete(todo).subscribe((updatedTodo) => {
            todo = updatedTodo;
        });
    }

    // Method to handle event emitted by TodoListComponent
    onRemoveTodo(todo: ToDo) {
        this._todoService.deleteTodoById(todo.id).subscribe(() => {
            this.todos = this.todos.filter((val) => val.id !== todo.id);
        });
    }

}
