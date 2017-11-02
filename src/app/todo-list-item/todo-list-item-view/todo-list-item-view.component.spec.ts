import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDo } from './../../to-do';

import { TodoListItemViewComponent } from './todo-list-item-view.component';

describe('TodoListItemViewComponent', () => {
    let component: TodoListItemViewComponent;
    let fixture: ComponentFixture<TodoListItemViewComponent>;
    let toggleEl;
    let destroyEl;
    let expectedTodo: ToDo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListItemViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListItemViewComponent);
        component = fixture.componentInstance;
        toggleEl = fixture.debugElement.nativeElement.querySelector('input[type=checkbox]');    // Find toggle checkbox element
        destroyEl = fixture.debugElement.nativeElement.querySelector('button');                 // Find destroy button element

        expectedTodo = new ToDo({ id: 1, title: 'Test', complete: false });
        component.todo = expectedTodo;
        fixture.detectChanges();
    });

    it(`should create an instance of 'TodoListItemViewComponent'`, () => {
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
        component.toggleCompleteTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to toggle event
        component.toggleTodoComplete(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should emit 'edit' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.editTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to edit event
        component.editTodo(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should emit 'remove' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.removeTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to remove event
        component.removeTodo(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    describe(`#view tests`, () => {
        it(`clicking on checkbox.toggle should emits 'toggleTodoComplete' event (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'toggleTodoComplete');
            toggleEl.click();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.toggleTodoComplete).toHaveBeenCalled();
            });
        });

        it(`clicking on button.destroy should emits 'removeTodo' event (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'removeTodo');
            destroyEl.click();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.removeTodo).toHaveBeenCalled();
            });
        });
    });
});
