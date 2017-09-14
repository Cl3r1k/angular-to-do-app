import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';
import { ToDo } from './../to-do';

@Component({
    selector: 'app-todo',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {

    name = 'Tom';
    newTodo: ToDo = new ToDo();

    // Попросим систему зависимостей Angular вставить нашу зависимость
    // с именем TodoService и назначить ее свойству 'todoService'
    constructor(private _todoService: TodoService) { }

    ngOnInit() {
    }

    // Наш сервис теперь доступен как this._todoService
    toggleTodoComplete(todo: ToDo) {
        this._todoService.toggleTodoComplete(todo);
    }

    addTodo() {
        // alert('addTodo called! newTodo.title: ' + this.newTodo.title);
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
