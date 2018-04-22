import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    @Input() todos: ToDo[];

    @Input() todosAllAmount: number;

    @Output()
    toggleCompleteTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    moreTodoTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    pinTodoTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    removeTodoListEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    moveTodoListEmitter: EventEmitter<Object> = new EventEmitter();

    dragEnabled = true;    // Variable for prefs to enable/disable DnD
    pinnedTodos: ToDo[];
    unpinnedTodos: ToDo[];
    completedTodos: ToDo[];

    constructor() { }

    ngOnInit() {
        console.log('in ngOnInit -> todos: ', this.todos);
        this.transformView(this.todos);
    }

    onToggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListEmitter.emit(todo);    // Emit the 'toggle' event to TodosComponent
    }

    onUpdateTodo(todo: ToDo) {
        this.updateTodoTodoListEmitter.emit(todo);    // Emit the 'update' event to TodosComponent
    }

    onMoreTodo(todo: ToDo) {
        this.moreTodoTodoListEmitter.emit(todo);    // Emit the 'more' event to TodosComponent
    }

    onPinTodo(todo: ToDo) {
        this.pinTodoTodoListEmitter.emit(todo);    // Emit the 'pin' event to TodosComponent
    }

    onRemoveTodo(todo: ToDo) {
        this.removeTodoListEmitter.emit(todo);    // Emit the 'remove' event to TodosComponent
    }

    onMove(oldPostition: number, newPosition: number) {
        if (oldPostition !== newPosition) {
            const shiftedTodoPos = oldPostition > newPosition ? newPosition + 1 : newPosition - 1;
            this.moveTodoListEmitter.emit({movedTodoIdSource: this.todos[shiftedTodoPos].id, movedTodoIdDest: this.todos[newPosition].id});
        }
    }

    transformView(todos: ToDo[]) {
        this.pinnedTodos = todos.filter(todo => {
            return !todo.complete && todo.pin;
        });

        this.unpinnedTodos = todos.filter(todo => {
            return !todo.complete && !todo.pin;
        });

        this.completedTodos = todos.filter(todo => {
            return todo.complete;
        });

        // console.log('%cpinnedTodos', 'color: salmon;', this.pinnedTodos);
        // console.log('%cpinnedTodos', 'color: salmon;', this.unpinnedTodos);
        // console.log('%cpinnedTodos', 'color: salmon;', this.completedTodos);
    }

}
