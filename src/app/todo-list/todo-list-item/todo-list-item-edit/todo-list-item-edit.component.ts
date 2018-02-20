import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

import { CustomTodoComponentInterface } from '@app/_interfaces/custom-todo-component-interface';

@Component({
    selector: 'app-todo-list-item-edit',
    templateUrl: './todo-list-item-edit.component.html',
    styleUrls: ['./todo-list-item-edit.component.scss']
})
export class TodoListItemEditComponent implements OnInit, AfterViewInit, AfterViewChecked, CustomTodoComponentInterface {

    @Input() todo: ToDo;

    @Output()
    toggleCompleteTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    editTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    updateTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output()
    cancelTodoListItemEmitter: EventEmitter<boolean> = new EventEmitter();

    @Output()
    removeTodoListItemEmitter: EventEmitter<ToDo> = new EventEmitter();

    initialTodoTitle: string;
    isCanceled: boolean;
    afterViewCheckedCount = 0;
    updatedTextHeight = false;

    @ViewChild('editedTodo') private editedTodoElementRef: ElementRef;

    constructor() { }

    ngOnInit() {
        this.initialTodoTitle = this.todo.title;
    }

    ngAfterViewInit() {
        this.editedTodoElementRef.nativeElement.focus();    // To set focus to the input when the component showed
    }

    ngAfterViewChecked() {
        // Workaround for autosize Textarea with two-side binding text
        // Another workaround is adjust height if length of todo.title more than 50 symbols, and if not height === 58.7px
        if (this.afterViewCheckedCount >= 1) {
            if (!this.updatedTextHeight) {
                let el: HTMLElement;
                el = this.editedTodoElementRef.nativeElement;
                if (el.style.height !== this.editedTodoElementRef.nativeElement.scrollHeight + 'px') {
                    el.style.overflow = 'hidden';
                    el.style.height = 'auto';
                    if (this.todo.title.length >= 50) {
                        el.style.height = el.scrollHeight + 'px';
                    } else {
                        el.style.height = '58.7px';
                    }
                }

                this.updatedTextHeight = true;
            }
        } else {
            this.afterViewCheckedCount++;
        }
    }

    toggleTodoComplete(todo: ToDo) {
        //
    }

    editTodo(todo: ToDo) {
        //
    }

    updateTodo(todo: ToDo) {
        this.editedTodoElementRef.nativeElement.blur();    // Imitate lost focus event
    }

    removeTodo(todo: ToDo) {
        console.log('removeTodo emited event removeTodoListItemEmitter from TodoListItemEditComponent with title: ' + todo.title);
        this.removeTodoListItemEmitter.emit(todo);
    }

    cancelEditTodo() {
        this.todo.title = this.initialTodoTitle;
        this.isCanceled = true;
        this.editedTodoElementRef.nativeElement.blur();    // Imitate lost focus event
    }

    stopEditTodoOnBlur() {

        if (this.todo.title) {
            if (this.isCanceled) {
                this.cancelTodoListItemEmitter.emit(true);
            } else {
                this.todo.title = this.todo.title.trim();
                this.updateTodoListItemEmitter.emit(this.todo);    // Emit the update event to Parent Component
            }
        } else {
            this.removeTodo(this.todo);
        }

    }

}
