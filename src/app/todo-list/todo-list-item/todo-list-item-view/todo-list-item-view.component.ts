import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { CustomTodoComponentInterface } from '@app/_interfaces/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-view',
    templateUrl: './todo-list-item-view.component.html',
    styleUrls: ['./todo-list-item-view.component.scss']
})
export class TodoListItemViewComponent implements OnInit, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    @Output()
    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    moreTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    pinTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    cancelTodoListItemEmitter: EventEmitter<boolean> = new EventEmitter();

    @Output()
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    // TODO: Cleanup 'edit' code later
    // editHoverState = false;
    completeHoverState = false;
    priorityColors = ['transparent', 'red', 'orange', 'yellow', 'blue', 'pink', 'gray', 'green'];
    priorityColor = this.priorityColors[0];
    titleToView = '';

    constructor() { }

    ngOnInit() {
        this.titleToView = this.parseTitle(this.todo);
        console.log('parse in ngOnInit -> title: %s and priorityColor: ', this.todo.title, this.priorityColor);
    }

    toggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodoListItemEmitter.emit(todo);
    }

    editTodo(todo: ToDo) {
        console.log('editTodo called in TodoListItemViewComponent with title: ', todo.title);
        this.editTodoListItemEmitter.emit(todo);    // Emit the 'edit' event to a Parent component
    }

    updateTodo(todo: ToDo) {
        //
    }

    showMore(todo: ToDo) {
        console.log('showMore called in TodoListItemViewComponent with title: %s, and id: %c%s', todo.title, 'color: red;', todo.inner_id);
        this.moreTodoListItemEmitter.emit(todo);    // Emit the 'more' event to a Parent component
    }

    pinTodo(todo: ToDo) {
        console.log('pinTodo called in TodoListItemViewComponent with title: %s, and id: %c%s', todo.title, 'color: red;', todo.inner_id);
        this.pinTodoListItemEmitter.emit(todo);    // Emit the 'pin' event to a Parent component
    }

    removeTodo(todo: ToDo) {
        // console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemViewComponent with title: ', todo.title);
        this.removeTodoListItemEmitter.emit(todo);
    }

    // setEditHover(state: boolean) {
    //     this.editHoverState = state;
    // }

    setCompleteHover(completeHoverState: boolean) {
        this.completeHoverState = completeHoverState;
    }

    parseTitle(todo: ToDo) {

        const tmpTitle = todo.title;

        let foundPriority = false;

        for (let mainInd = tmpTitle.length - 1; mainInd >= 0; mainInd--) {
            const lastIndex = tmpTitle.lastIndexOf('!', mainInd);

            if (lastIndex < 0) {
                break;    // '!' not found, skip parsing
            }

            if (lastIndex === tmpTitle.length - 1 || tmpTitle[lastIndex + 1] === ' ') {
                let counter = 0;
                let notPriority = false;
                for (let i = lastIndex; i >= 0; i--) {
                    if (tmpTitle[i] === '!') {
                        counter++;
                        continue;
                    }
                    if (tmpTitle[i] === ' ') {
                        foundPriority = true;
                        break;
                    } else {
                        notPriority = true;
                        break;
                    }
                }

                if (foundPriority) {
                    break;
                }
            } else {
                continue;
            }
        }

        // if (!notPriority)

        return todo.title;
    }

}
