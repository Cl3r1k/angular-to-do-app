import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToDo } from '@app/_models/to-do';

import { TodoListItemEditComponent } from '@app/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';

describe('TodoListItemEditComponent', () => {
    let component: TodoListItemEditComponent;
    let fixture: ComponentFixture<TodoListItemEditComponent>;
    let inputEl;
    let destroyEl;
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

        inputEl = fixture.debugElement.nativeElement.querySelector('textarea.edit');    // Find textarea.edit element
        // destroyEl = fixture.debugElement.nativeElement.querySelector('svg.icon-destroy');    // Find destroy icon element
        destroyEl = fixture.debugElement.query(By.css('svg.icon-destroy'));           // Find destroy icon element

        console.log('%cdestroyEl: ', 'color: brown;', destroyEl);

        expectedTodo = new ToDo({ id: 1, title: 'Test title in TodoListItemEditComponent', complete: false });
        component.todo = expectedTodo;
        fixture.detectChanges();
    });

    it(`should create an instance of 'TodoListItemEditComponent' (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it(`should be equal to expectedTodo (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.todo).toEqual(expectedTodo);
    }));

    it(`should have pinTodoListItemEmitter (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.pinTodoListItemEmitter).toBeTruthy();
    }));

    it(`should call method 'updateTodo()' which imitates blur event, which emits 'update' event (async)`, async(() => {
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

    it(`should call method 'removeTodo()' which imitate blur event, which emit 'remove' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.removeTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to remove event
        component.removeTodo(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should call method 'cancelEditTodo()' which imitates blur event, which emits 'cancel' event (async)`, async(() => {
        // Arrange
        let cancelState: boolean;

        // Act
        component.cancelTodoListItemEmitter.subscribe((value) => cancelState = value);    // Subscribe to update event
        component.cancelEditTodo();
        inputEl.dispatchEvent(new Event('blur'));    // Call explicitly blur event, sometimes it won't called in method 'cancelEditTodo'

        // Assert
        expect(cancelState).toEqual(true);
    }));

    it(`should call method 'stopEditTodoOnBlur()' which emit 'update' event with new title (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.todo = expectedTodo;
        component.todo.title = 'new title';
        component.updateTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to update event
        component.stopEditTodoOnBlur();

        // Assert
        expect(todo.title).toEqual('new title');
    }));

    it(`should call method 'stopEditTodoOnBlur()' which emits 'remove' event if title is impty (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.todo = expectedTodo;
        component.todo.title = '';
        component.removeTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to remove event
        component.stopEditTodoOnBlur();

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    describe(`#view tests`, () => {
        it(`losing focus input.edit should call method 'stopEditTodoOnBlur()' (async)`, async(() => {
            // Arrange

            // Act
            spyOn(component, 'stopEditTodoOnBlur');

            // Set input value focus lost
            inputEl.dispatchEvent(new Event('blur'));
            fixture.detectChanges();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.stopEditTodoOnBlur).toHaveBeenCalled();
            });
        }));

        it(`hover on svg.icon-destroy should call method 'setDeleteHover()' (async)`, async(() => {
            // Arrange

            // Act
            spyOn(component, 'setDeleteHover');

            // Set svg hover state
            destroyEl.dispatchEvent(new Event('blur'));
            fixture.detectChanges();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setDeleteHover).toHaveBeenCalled();
            });
        }));

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
    });
});
