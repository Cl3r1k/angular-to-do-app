import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToDo } from '@app/_models/to-do';

import { TodoListHeaderComponent } from '@app/todo-list-header/todo-list-header.component';

describe('TodoListHeaderComponent', () => {
    let component: TodoListHeaderComponent;
    let fixture: ComponentFixture<TodoListHeaderComponent>;
    let addTodoEl;

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
        addTodoEl = fixture.debugElement.nativeElement.querySelector('input[type=text]');    // Find addTodoEl text field element

        fixture.detectChanges();
    });

    it('should create an instance', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should have a newTodo as instance of Todo', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.newTodo instanceof ToDo).toBeTruthy();
    }));

    it('should display "Todo" in h1 tag', async(() => {
        // Arrange
        const compiled = fixture.debugElement.nativeElement;

        // Act

        // Assert
        expect(compiled.querySelector('h1').textContent).toContain('Todo');
    }));

    it(`should emit 'add' event (async)`, async(() => {
        // Arrange
        const expectedTodo: ToDo = new ToDo({ id: 1, title: 'exp Todo', complete: false });
        let newTodo: ToDo;

        // Act
        component.newTodo = expectedTodo;
        component.addTodoListHeaderEmitter.subscribe((value) => newTodo = value);    // Subscribe to add event
        component.addTodo();

        // Assert
        expect(newTodo).toEqual(expectedTodo);
        expect(component.newTodo).toEqual(new ToDo());
    }));

    describe(`#addTodo`, () => {
        it(`should reinit newTodo property`, async(() => {
            // Arrange
            const expectedTodo: ToDo = new ToDo({ id: 1, title: 'exp Todo', complete: false });

            // Act
            component.addTodo();

            // Assert
            expect(component.newTodo).toEqual(new ToDo());
        }));
    });

    describe(`#view tests`, () => {
        it(`press Enter on text.new-todo should emits 'addTodo' event (async)`, async () => {
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
    });
});
