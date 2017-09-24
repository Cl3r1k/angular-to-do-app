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
    let expectedTodos: ToDo [];

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

        expectedTodos = [ new ToDo({ id: 1, title: 'Test 1', complete: false }), new ToDo({ id: 2, title: 'Test 2', complete: true })];
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

    // TODO: Add event tests for emit
});
