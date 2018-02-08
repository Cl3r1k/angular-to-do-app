import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToDo } from '@app/_models/to-do';

import { Component } from '@angular/core';
import { TodoListComponent } from '@app/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todo-list-item/todo-list-item.component';
import { TodoListItemEditComponent } from '@app/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListItemViewComponent } from '@app/todo-list-item/todo-list-item-view/todo-list-item-view.component';

// Modules
import { DndModule } from 'ng2-dnd';

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;
    let expectedTodos: ToDo[];
    let todo1: ToDo;
    let todo2: ToDo;
    let todo3: ToDo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoListComponent,
                TodoListItemComponent,
                TodoListItemViewComponent,
                TodoListItemEditComponent
            ],
            imports: [
                FormsModule,
                DndModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;

        component.todosAllAmount = 1;                // Lets count that we have more than 0 todo
        fixture.detectChanges();

        todo1 = new ToDo({ id: 1, title: 'Test 1', complete: false });
        todo2 = new ToDo({ id: 2, title: 'Test 2', complete: true });
        todo3 = new ToDo({ id: 3, title: 'Test 3', complete: false });
        expectedTodos = [todo1, todo2, todo3];
        component.todos = expectedTodos;
        fixture.detectChanges();
    });

    it('should create an instance (TodoListItemComponent used)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should be equal to expectedTodos', () => {
        // Arrange

        // Act

        // Assert
        expect(component.todos).toEqual(expectedTodos);
    });

    it(`should emit 'updateComplete' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.updateTodoTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to update event
        component.onUpdateTodo(todo1);

        // Assert
        expect(todo).toEqual(todo1);
    }));

    it(`should emit 'toggleComplete' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.toggleCompleteTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to toggle event
        component.onToggleTodoComplete(todo1);

        // Assert
        expect(todo).toEqual(todo1);
    }));

    it(`should emit 'remove' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.removeTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to remove event
        component.onRemoveTodo(todo1);

        // Assert
        expect(todo).toEqual(todo1);
    }));

    it(`should move todo at top to bottom (async)`, async(() => {
        // Arrange
        fixture.detectChanges();

        const todoToDragEl = fixture.debugElement.queryAll(By.css('li'))[0].nativeElement;
        const todoToDropEl = fixture.debugElement.queryAll(By.css('li'))[2].nativeElement;
        const handleEl = fixture.debugElement.queryAll(By.css('.handle'))[0].nativeElement;

        // Act
        triggerEvent(handleEl, 'mousedown', 'MouseEvent');
        triggerEvent(todoToDragEl, 'dragstart', 'MouseEvent');
        triggerEvent(todoToDropEl, 'dragenter', 'MouseEvent');
        triggerEvent(handleEl, 'mouseup', 'MouseEvent');
        triggerEvent(todoToDragEl, 'drop', 'MouseEvent');
        fixture.detectChanges();

        // Assert
        expect(component.todos.map(todo => todo.id)).toEqual([2, 3, 1]);
    }));

    function triggerEvent(elem: HTMLElement, eventName: string, eventType: string) {
        const event: Event = document.createEvent(eventType);
        event.initEvent(eventName, true, true);
        elem.dispatchEvent(event);
    }
});
