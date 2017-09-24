import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToDo } from './../to-do';

import { TodoListFooterComponent } from './todo-list-footer.component';

describe('TodoListFooterComponent', () => {
    let component: TodoListFooterComponent;
    let fixture: ComponentFixture<TodoListFooterComponent>;
    let footerEl;
    let expectedTodos: ToDo[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListFooterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListFooterComponent);
        component = fixture.componentInstance;
        footerEl = fixture.debugElement.query(By.css('footer'));    // Find footer element

        expectedTodos = [new ToDo({ id: 1, title: 'Test 1', complete: false }), new ToDo({ id: 2, title: 'Test 2', complete: true })];
        component.todos = expectedTodos;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it('should be equal to expectedTodos', () => {
        // Arrange

        // Act

        // Assert
        expect(component.todos).toEqual(expectedTodos);
    });

    // TODO: Add event tests for emit
});
