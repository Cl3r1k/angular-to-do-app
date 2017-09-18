import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {

    newTodo: ToDo = new ToDo();

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token 'TodoDataService'
    // and assign it to a property called _todoDataService
    constructor(private _todoService: TodoService) { }

    ngOnInit() {
    }

    // Service is now available as this._todoDataService
    toggleTodoComplete(todo: ToDo) {
        this._todoService.toggleTodoComplete(todo);
    }

    addTodo() {
        this._todoService.addTodo(this.newTodo);
        this.newTodo = new ToDo();
    }

    removeTodo(todo: ToDo) {
        this._todoService.deleteTodoById(todo.id);
    }

    get todos() {
        return this._todoService.getAllTodos();
    }

}
