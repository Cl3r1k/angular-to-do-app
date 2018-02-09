import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

    @Input() todos: ToDo[];

    @Input() todosAllAmount: number;

    @Output()
    updateTodoTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    toggleCompleteTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    removeTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    moveTodoListEmitter: EventEmitter<Object> = new EventEmitter();

    dragEnabled = true;    // Variable for prefs to enable/disable DnD

    constructor() { }

    onUpdateTodo(todo: ToDo) {
        this.updateTodoTodoListEmitter.emit(todo);    // Emit the update event to TodosComponent
    }

    onToggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListEmitter.emit(todo);    // Emit the toggle event to TodosComponent
    }

    onRemoveTodo(todo: ToDo) {
        this.removeTodoListEmitter.emit(todo);    // Emit the remove event to TodosComponent
    }

    onMove(oldPostition: number, newPosition: number) {
        console.log('old position: %d, new position: %d', oldPostition, newPosition);
        if (oldPostition !== newPosition) {
            this.moveTodoListEmitter.emit({movedTodIdSource: this.todos[newPosition].id, movedTodIdDest: this.todos[oldPostition].id});
        }
        // console.log('new position: %d for todo: ', position, todo);
        // console.log('The list after movements', this.todos);
        // this.moveTodoListEmitter.emit({movedTodId: todo.id, newTodoPosition: position});
    }

}
