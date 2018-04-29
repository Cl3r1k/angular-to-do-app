import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToDo } from '@app/_models/to-do';

import { Component } from '@angular/core';
import { TodoListComponent } from '@app/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todo-list/todo-list-item/todo-list-item.component';
import { TodoListItemEditComponent } from '@app/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';

// Modules
import { DndModule } from 'ng2-dnd';

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;
    const expectedTodos: [ToDo[]] = [[]];
    let todo1pinned: ToDo;
    let todo2pinned: ToDo;
    let todo3pinned: ToDo;
    let todo1unpinned: ToDo;
    let todo2unpinned: ToDo;
    let todo3unpinned: ToDo;
    let todo1completed: ToDo;
    let todo2completed: ToDo;
    let todo3completed: ToDo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoListComponent,
                TodoListItemComponent,
                TodoListItemViewComponent,
                TodoListItemEditComponent
            ],
            imports: [
                FormsModule,
                DndModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;

        todo1pinned = new ToDo({ id: 1, title: 'Test 1 pinned', complete: false });
        todo1pinned.pin = true;
        todo2pinned = new ToDo({ id: 2, title: 'Test 2 pinned', complete: false });
        todo2pinned.pin = true;
        todo3pinned = new ToDo({ id: 3, title: 'Test 3 pinned', complete: false });
        todo3pinned.pin = true;
        todo1unpinned = new ToDo({ id: 4, title: 'Test 4 unpinned', complete: false });
        todo2unpinned = new ToDo({ id: 5, title: 'Test 5 unpinned', complete: false });
        todo3unpinned = new ToDo({ id: 6, title: 'Test 6 unpinned', complete: false });
        todo1completed = new ToDo({ id: 7, title: 'Test 7 completed', complete: true });
        todo2completed = new ToDo({ id: 8, title: 'Test 8 completed', complete: true });
        todo3completed = new ToDo({ id: 9, title: 'Test 9 completed', complete: true });

        expectedTodos[0] = [todo1pinned, todo2pinned, todo3pinned];
        expectedTodos.push([todo1unpinned, todo2unpinned, todo3unpinned]);
        expectedTodos.push([todo1completed, todo2completed, todo3completed]);
        component.todosToView = expectedTodos;
        component.todosAllAmount = 3;                // Lets count that we have more than 0 todo
        fixture.detectChanges();
    });

    it('should create an instance (TodoListItemComponent used)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should be equal to expectedTodos', () => {
        // Arrange

        // Act

        // Assert
        expect(component.todosToView).toEqual(expectedTodos);
    });

    it(`should emit 'toggleComplete' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.toggleCompleteTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to toggle event
        component.onToggleTodoComplete(todo1);

        // Assert
        expect(todo).toEqual(todo1);
    }));

    it(`should emit 'update' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.updateTodoTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to update event
        component.onUpdateTodo(todo1);

        // Assert
        expect(todo).toEqual(todo1);
    }));

    it(`should emit 'pin' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.pinTodoTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to pin event
        component.onPinTodo(todo1);

        // Assert
        expect(todo).toEqual(todo1);
    }));

    it(`should emit 'remove' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.removeTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to remove event
        component.onRemoveTodo(todo1);

        // Assert
        expect(todo).toEqual(todo1);
    }));

    describe(`#view tests:`, () => {
        it(`should move todo at top to bottom (async)`, async(() => {
            // Arrange
            fixture.detectChanges();

            const todoToDragEl = fixture.debugElement.queryAll(By.css('li'))[0].nativeElement;
            const todoToDropEl = fixture.debugElement.queryAll(By.css('li'))[2].nativeElement;
            const handleEl = fixture.debugElement.queryAll(By.css('.handle'))[0].nativeElement;

            // Act
            triggerEvent(handleEl, 'mousedown', 'MouseEvent');
            triggerEvent(todoToDragEl, 'dragstart', 'MouseEvent');
            triggerEvent(todoToDropEl, 'dragenter', 'MouseEvent');
            triggerEvent(handleEl, 'mouseup', 'MouseEvent');
            triggerEvent(todoToDragEl, 'drop', 'MouseEvent');
            fixture.detectChanges();

            // Assert
            expect(component.todos.map(todo => todo.id)).toEqual([2, 3, 1]);
        }));
    });

    function triggerEvent(elem: HTMLElement, eventName: string, eventType: string) {
        const event: Event = document.createEvent(eventType);
        event.initEvent(eventName, true, true);
        elem.dispatchEvent(event);
    }
});
