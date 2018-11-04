import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    @Input() todos: ToDo[];
    @Input() todosToView = [[]];

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
    moveTodoListEmitter: EventEmitter<ToDo[]> = new EventEmitter();

    @Output() clearTodoListEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() clearHoverStateTodoListEmitter: EventEmitter<boolean> = new EventEmitter();

    dragEnabled = true;    // Variable for prefs to enable/disable DnD
    collapseState = true;
    completedTodosHoverState = false;

    constructor() { }

    ngOnInit() {
        // console.log('%cin ngOnInit -> todosToView: ', this.consoleTextColorComponent, this.todosToView);
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

        // Reorder list with new state
        const todosUpdated: ToDo[] = this.todosToView[0].concat(this.todosToView[1], this.todosToView[2]);

        this.moveTodoListEmitter.emit(todosUpdated);

        // An old code for DnD
        // if (oldPostition !== newPosition) {
        //     console.log('%ctodosToView: ', this.consoleTextColorComponent, this.todosToView);
        //     const shiftedTodoPos = oldPostition > newPosition ? newPosition + 1 : newPosition - 1;
        //  this.moveTodoListEmitter.emit({movedTodoIdSource: this.todos[shiftedTodoPos].id, movedTodoIdDest: this.todos[newPosition].id});
        // }
    }

    collapseCompletedTodos(collapseState: boolean) {
        // console.log('%cin collapseCompletedTodos collapseState: ', this.consoleTextColorComponent, collapseState);
        this.collapseState = !this.collapseState;
    }

    setCompletedTodosHoverState(completedTodosHoverState: boolean) {
        this.completedTodosHoverState = completedTodosHoverState;
    }

    clearCompleted(clearState: boolean) {
        // console.log('%cin TodoListComponent clearState: ', this.consoleTextColorComponent, clearState);
        this.clearTodoListEmitter.emit(clearState);
    }

    setClearCompletedHoverState(clearCompletetHoverState: boolean) {
        // console.log('%cin TodoListComponent clearCompletetHoverState: ', this.consoleTextColorComponent, clearCompletetHoverState);
        this.clearHoverStateTodoListEmitter.emit(clearCompletetHoverState);
    }

}
