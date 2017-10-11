import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToDo } from './../to-do';

import { TodoListItemComponent } from './todo-list-item.component';

describe('TodoListItemComponent', () => {
    let component: TodoListItemComponent;
    let fixture: ComponentFixture<TodoListItemComponent>;
    let todoEl;
    let expectedTodo: ToDo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListItemComponent);
        component = fixture.componentInstance;
        todoEl = fixture.debugElement.query(By.css('view'));    // Find Todo element

        expectedTodo = new ToDo({ id: 1, title: 'Test', complete: false });
        component.todo = expectedTodo;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it('should be equal to expectedTodo', () => {
        // Arrange

        // Act

        // Assert
        expect(component.todo).toEqual(expectedTodo);
    });

    it(`should emit 'toggleComplete' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.toggleComplete.subscribe((value) => todo = value);
        component.toggleTodoComplete(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should emit 'remove' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.remove.subscribe((value) => todo = value);
        component.removeTodo(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`clicking on checkbox.toggle emits 'toggleComplete' event (async)`, async() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.remove.subscribe((value) => todo = value);
        component.removeTodo(expectedTodo);

        // Assert
        expect(todo.id).toEqual(expectedTodo.id);
        expect(todo.title).toEqual(expectedTodo.title);
        expect(todo.complete).toEqual(expectedTodo.complete);
    });
});
