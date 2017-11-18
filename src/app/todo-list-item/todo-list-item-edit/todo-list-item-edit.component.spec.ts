import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToDo } from '@app/_models/to-do';

import { TodoListItemEditComponent } from '@app/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';

describe('TodoListItemEditComponent', () => {
    let component: TodoListItemEditComponent;
    let fixture: ComponentFixture<TodoListItemEditComponent>;
    let inputEl;
    let expectedTodo: ToDo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListItemEditComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListItemEditComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.nativeElement.querySelector('input[type=text]');    // Find input.edit element

        expectedTodo = new ToDo({ id: 1, title: 'Test title in TodoListItemEditComponent', complete: false });
        component.todo = expectedTodo;
        fixture.detectChanges();
    });

    it(`should create an instance of 'TodoListItemEditComponent'`, () => {
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

    it(`should call method 'updateTodo' which imitate blur event, which emit 'update' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.todo = expectedTodo;
        console.log('in updateTodo component.todo.title: ' + component.todo.title);
        component.updateTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to update event
        component.updateTodo(expectedTodo);
        inputEl.dispatchEvent(new Event('blur'));    // Call explicitly blur event, sometimes it won't called in method 'updateTodo'

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should call method 'removeTodo' which imitate blur event, which emit 'remove' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.removeTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to remove event
        component.removeTodo(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should call method 'cancelEditTodo' which apply initial title, imitate blur event, which emit 'update' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.todo = expectedTodo;
        component.initialTodoTitle = 'expectedTodo.title';
        component.todo.title = 'new title';
        component.updateTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to update event
        component.cancelEditTodo();
        inputEl.dispatchEvent(new Event('blur'));    // Call explicitly blur event, sometimes it won't called in method 'cancelEditTodo'

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should call method 'stopEditTodo' which emit 'update' event with new title (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.todo = expectedTodo;
        component.todo.title = 'new title';
        component.updateTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to update event
        component.stopEditTodo();

        // Assert
        expect(todo.title).toEqual('new title');
    }));

    it(`should call method 'stopEditTodo' which emit 'remove' event if title is impty (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.todo = expectedTodo;
        component.todo.title = '';
        component.removeTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to remove event
        component.stopEditTodo();

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    describe(`#view tests`, () => {
        it(`losing focus input.edit should call 'stopEditTodo' method (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'stopEditTodo');

            // Set input value focus lost
            inputEl.dispatchEvent(new Event('blur'));
            fixture.detectChanges();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.stopEditTodo).toHaveBeenCalled();
            });
        });
    });
});
