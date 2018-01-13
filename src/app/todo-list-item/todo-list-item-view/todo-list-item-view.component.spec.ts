import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDo } from '@app/_models/to-do';

import { TodoListItemViewComponent } from '@app/todo-list-item/todo-list-item-view/todo-list-item-view.component';

describe('TodoListItemViewComponent', () => {
    let component: TodoListItemViewComponent;
    let fixture: ComponentFixture<TodoListItemViewComponent>;
    let toggleEl;
    let destroyEl;
    let editEl;
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
        destroyEl = fixture.debugElement.nativeElement.querySelector('.icon-destroy');          // Find destroy icon element
        editEl = fixture.debugElement.nativeElement.querySelector('.icon-pencil-edit');         // Find edit icon element

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

    // TODO: View tests are working not proper (look in nativeElements - they are not working proper)
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

        it(`clicking on svg.icon-destroy should call method 'close()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'removeTodo');
            destroyEl.click();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.removeTodo).toHaveBeenCalled();
            });
        });

        it(`clicking on svg.icon-pencil-edit should call method 'editTodo()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'editTodo');
            editEl.click();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.editTodo).toHaveBeenCalled();
            });
        });
    });
});
