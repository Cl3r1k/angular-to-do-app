import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ToDo } from '@app/_models/to-do';

import { TodoListHeaderComponent } from '@app/todo-list-header/todo-list-header.component';

describe('TodoListHeaderComponent', () => {
    let component: TodoListHeaderComponent;
    let fixture: ComponentFixture<TodoListHeaderComponent>;
    let addTodoEl;
    let toggleAllEl;

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

        addTodoEl = fixture.debugElement.nativeElement.querySelector('input[type=text].new-todo');      // Find addTodoEl text field element
        toggleAllEl = fixture.debugElement.nativeElement.querySelector('input[type=checkbox].toggle-all'); // Find toggleAll checkbox elem

        fixture.detectChanges();
    });

    it('should create an instance (async)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should have a newTodo as instance of Todo (async)', async(() => {
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

    describe(`#view tests`, () => {
        it(`press Enter on text.new-todo should call method 'addTodo' (async)`, async () => {
            // Arrange
            const event = new KeyboardEvent('keyup', {
                'key': 'Enter'
            });

            // Act
            spyOn(component, 'addTodo');
            addTodoEl.dispatchEvent(event);

            // Assert
            fixture.whenStable().then(() => {
                expect(component.addTodo).toHaveBeenCalled();
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
    });
});
