import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToDo } from '../to-do';

import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;
    let mainEl;
    let expectedTodos: ToDo[];
    let todo1: ToDo;
    let todo2: ToDo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoListComponent,
                TodoListItemComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        mainEl = fixture.debugElement.query(By.css('main'));    // Find main element

        todo1 = new ToDo({ id: 1, title: 'Test 1', complete: false });
        todo2 = new ToDo({ id: 2, title: 'Test 2', complete: true });
        expectedTodos = [todo1, todo2];
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

    it(`should emit 'toggleComplete' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.toggleCompleteTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to toggle event
        component.onToggleTodoComplete(todo1);

        // Assert
        expect(todo).toEqual(todo1);
    }));

    it(`should emit 'updateComplete' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.updateTodoTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to update event
        component.updateTodo(todo1);

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
});
