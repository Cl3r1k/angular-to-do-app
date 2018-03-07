import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ToDo } from '@app/_models/to-do';

import { TodoListHeaderComponent } from '@app/todo-list-header/todo-list-header.component';

describe('TodoListHeaderComponent', () => {
    let component: TodoListHeaderComponent;
    let fixture: ComponentFixture<TodoListHeaderComponent>;
    let addTodoInputEl;
    let toggleAllEl;
    let addTodoSvgEl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListHeaderComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListHeaderComponent);
        component = fixture.componentInstance;

        component.todosAllAmount = 11;    // Lets count that we have more than 0 todo
        fixture.detectChanges();

        addTodoInputEl = fixture.debugElement.nativeElement.querySelector('input[type=text].new-todo'); // Find new-todo text field elem
        toggleAllEl = fixture.debugElement.nativeElement.querySelector('input[type=checkbox].toggle-all'); // Find toggleAll checkbox elem
        addTodoSvgEl = fixture.debugElement.query(By.css('svg.icon-keyboard_return'));        // Find svg.icon-keyboard_return elem

        console.log('%c addTodoSvgEl: ', 'color: red;', addTodoSvgEl);

        fixture.detectChanges();
    });

    it(`should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it(`should have a newTodo as instance of Todo (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.newTodo instanceof ToDo).toBeTruthy();
    }));

    it(`should emit 'add' event (async)`, async(() => {
        // Arrange
        const expectedTodo: ToDo = new ToDo({ id: 1, title: 'exp Todo', complete: false });
        let newTodo: ToDo;

        // Act
        component.newTodo = expectedTodo;
        component.addTodoListHeaderEmitter.subscribe((value) => newTodo = value);    // Subscribe to 'add' event
        component.addTodo();

        // Assert
        expect(newTodo).toEqual(expectedTodo);
        expect(component.newTodo).toEqual(new ToDo());
    }));

    it(`should emit 'toggleAll' event (async)`, async(() => {
        // Arrange
        let newToggleState = false;

        // Act
        component.toggleAllTodoListHeaderEmitter.subscribe((value) => newToggleState = value);    // Subscribe to 'toggleAll' event
        component.toggleAllTodos(true);

        // Assert
        expect(newToggleState).toEqual(true);
    }));

    describe(`#addTodo`, () => {
        it(`should reinit newTodo property (async)`, async(() => {
            // Arrange
            const expectedTodo: ToDo = new ToDo({ id: 1, title: 'exp Todo', complete: false });

            // Act
            component.addTodo();

            // Assert
            expect(component.newTodo).toEqual(new ToDo());
        }));
    });

    describe(`#setNewTodoFocus`, () => {
        it(`should set state for 'newTodoFocusState' (async)`, async(() => {
            // Arrange
            component.newTodoFocusState = false;

            // Act
            component.setNewTodoFocus(true);

            // Assert
            expect(component.newTodoFocusState).toEqual(true);
        }));
    });

    describe(`#view tests`, () => {
        it(`press Enter on text.new-todo should call method 'addTodo' (async)`, async () => {
            // Arrange
            const event = new KeyboardEvent('keyup', {
                'key': 'Enter'
            });

            // Act
            spyOn(component, 'addTodo');
            addTodoInputEl.dispatchEvent(event);

            // Assert
            fixture.whenStable().then(() => {
                expect(component.addTodo).toHaveBeenCalled();
            });
        });

        it(`losing focus input.new-todo should call method 'setNewTodoFocus()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'setNewTodoFocus');

            // Set input value focus lost
            addTodoInputEl.dispatchEvent(new Event('blur'));
            fixture.detectChanges();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setNewTodoFocus).toHaveBeenCalled();
            });
        });

        it(`setting focus input.new-todo should call method 'setNewTodoFocus()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'setNewTodoFocus');

            // Set input value focus lost
            addTodoInputEl.dispatchEvent(new Event('focus'));
            fixture.detectChanges();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.setNewTodoFocus).toHaveBeenCalled();
            });
        });

        it(`clicking on checkbox.toggle-all should call method 'toggleAllTodos()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'toggleAllTodos');
            toggleAllEl.click();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.toggleAllTodos).toHaveBeenCalled();
            });
        });

        it(`clicking on svg.icon-keyboard_return should call method 'addTodo()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'addTodo');
            if (addTodoSvgEl instanceof HTMLElement) {
                addTodoSvgEl.click();
            } else {
                addTodoSvgEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.addTodo).toHaveBeenCalled();
            });
        });
    });
});
