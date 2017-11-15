import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '@app/to-do';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

    @Input()
    todos: ToDo[];

    @Output()
    toggleCompleteTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleAllTodoListEmitter: EventEmitter<boolean> = new EventEmitter();

    @Output()
    removeTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    onToggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListEmitter.emit(todo);    // Emit the toggle event to TodosComponent
    }

    updateTodo(todo: ToDo) {
        this.updateTodoTodoListEmitter.emit(todo);    // Emit the update event to TodosComponent
    }

    onRemoveTodo(todo: ToDo) {
        this.removeTodoListEmitter.emit(todo);    // Emit the remove event to TodosComponent
    }

    toggleAllTodos(state: boolean) {
        // console.log('current state set to: ', state);
        this.toggleAllTodoListEmitter.emit(state);
        // TODO: Остановился здесь, не идет вверх событие?
    }
}
