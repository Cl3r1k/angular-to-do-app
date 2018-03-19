import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ToDo } from '@app/_models/to-do';

import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';

describe('TodoListItemViewComponent', () => {
    let component: TodoListItemViewComponent;
    let fixture: ComponentFixture<TodoListItemViewComponent>;
    let toggleEl;
    let editEl;
    let destroyEl;
    let pinEl;
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
        toggleEl = fixture.debugElement.query(By.css('input[type=checkbox]'));        // Find toggle checkbox element
        editEl = fixture.debugElement.query(By.css('svg.icon-pencil-edit'));          // Find edit icon element
        destroyEl = fixture.debugElement.query(By.css('svg.icon-destroy'));           // Find destroy icon element
        pinEl = fixture.debugElement.query(By.css('svg.icon-pin'));                   // Find pin icon element

        expectedTodo = new ToDo({ id: 1, title: 'Test title in TodoListItemViewComponent', complete: false });
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

    it(`should emit 'pin' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.pinTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to pin event
        component.pinTodo(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    describe(`#view tests`, () => {
        it(`clicking on checkbox.toggle should emits 'toggleTodoComplete' event (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'toggleTodoComplete');
            if (toggleEl instanceof HTMLElement) {
                toggleEl.click();
            } else {
                toggleEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.toggleTodoComplete).toHaveBeenCalled();
            });
        });

        it(`clicking on svg.icon-pencil-edit should call method 'editTodo()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'editTodo');
            if (editEl instanceof HTMLElement) {
                editEl.click();
            } else {
                editEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.editTodo).toHaveBeenCalled();
            });
        });

        it(`clicking on svg.icon-destroy should call method 'close()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'removeTodo');
            if (destroyEl instanceof HTMLElement) {
                destroyEl.click();
            } else {
                destroyEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.removeTodo).toHaveBeenCalled();
            });
        });

        it(`clicking on svg.icon-pin should call method 'pinTodo()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'pinTodo');
            if (pinEl instanceof HTMLElement) {
                pinEl.click();
            } else {
                pinEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.pinTodo).toHaveBeenCalled();
            });
        });
    });
});
