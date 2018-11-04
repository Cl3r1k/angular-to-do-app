import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Models
import { ToDo } from '@app/_models/to-do';

// Components
import { TodoListComponent } from '@app/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todo-list/todo-list-item/todo-list-item.component';
import { TodoListItemEditComponent } from '@app/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';

// Pipes
import { SafePipe } from '@app/_pipes/safe.pipe';
import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';

// Services
import { TagService } from '@app/_services/tag.service';
import { TagMockService } from '@app/_services/tag-mock.service';

// Modules
import { DndModule } from '@beyerleinf/ngx-dnd';

describe('Component: TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;
    const expectedTodos = [[]];
    let todo1pinned: ToDo;
    let todo2pinned: ToDo;
    let todo3pinned: ToDo;
    let todo1unpinned: ToDo;
    let todo2unpinned: ToDo;
    let todo3unpinned: ToDo;
    let todo1completed: ToDo;
    let todo2completed: ToDo;
    let todo3completed: ToDo;
    let divCompletedTodosEl;
    let svgBroomEl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoListComponent,
                TodoListItemComponent,
                TodoListItemViewComponent,
                TodoListItemEditComponent,
                SafePipe,
                ParseTagPipe
            ],
            imports: [
                FormsModule,
                DndModule.forRoot()
            ],
            providers: [
                {
                    provide: TagService,
                    useClass: TagMockService
                }
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
        component.todosAllAmount = 9;                // Lets count that we have more than 0 todo
        fixture.detectChanges();

        divCompletedTodosEl = fixture.debugElement.query(By.css('div.completed-todos'));     // Find div.completed-todos element
        svgBroomEl = fixture.debugElement.query(By.css('svg.icon-broom'));                   // Find svg.icon-broom element
        // console.log(`%c'beforeEach()' in 'TodoListComponent' nativeElement:`, 'color: teal;', fixture.debugElement.nativeElement);
        // console.log(`%c'beforeEach()' in 'TodoListComponent' svgBroomEl:`, 'color: teal;', svgBroomEl);

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
        component.toggleCompleteTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to 'toggle' event
        component.onToggleTodoComplete(todo1unpinned);

        // Assert
        expect(todo).toEqual(todo1unpinned);
    }));

    it(`should emit 'update' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.updateTodoTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to 'update' event
        component.onUpdateTodo(todo1unpinned);

        // Assert
        expect(todo).toEqual(todo1unpinned);
    }));

    it(`should emit 'more' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.moreTodoTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to 'more' event
        component.onMoreTodo(todo1unpinned);

        // Assert
        expect(todo).toEqual(todo1unpinned);
    }));

    it(`should emit 'pin' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.pinTodoTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to 'pin' event
        component.onPinTodo(todo1unpinned);

        // Assert
        expect(todo).toEqual(todo1unpinned);
    }));

    it(`should emit 'remove' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.removeTodoListEmitter.subscribe((value) => todo = value);    // Subscribe to 'remove' event
        component.onRemoveTodo(todo1unpinned);

        // Assert
        expect(todo).toEqual(todo1unpinned);
    }));

    it(`should emit 'move' event (async)`, async(() => {
        // Arrange
        let todos: ToDo[];

        // Act
        component.moveTodoListEmitter.subscribe((value) => todos = value);    // Subscribe to 'move' event
        component.onMove(1, 2);

        // Assert
        expect(todos).toEqual(expectedTodos[0].concat(expectedTodos[1], expectedTodos[2]));
    }));

    it(`should emit 'clear' event (async)`, async(() => {
        // Arrange
        let state: boolean;

        // Act
        component.clearTodoListEmitter.subscribe((value) => state = value);    // Subscribe to 'clear' event
        component.clearCompleted(true);

        // Assert
        expect(state).toEqual(true);
    }));

    it(`should emit 'clearHoverState' event (async)`, async(() => {
        // Arrange
        let state: boolean;

        // Act
        component.clearHoverStateTodoListEmitter.subscribe((value) => state = value);    // Subscribe to 'clearHoverState' event
        component.setClearCompletedHoverState(true);

        // Assert
        expect(state).toEqual(true);
    }));

    describe(`#view tests:`, () => {
        describe(`DnD tests:`, () => {
            it(`should move todo at top to bottom (async)`, async(() => {
                // Arrange
                fixture.detectChanges();

                const todoToDragEl = fixture.debugElement.queryAll(By.css('li'))[0].nativeElement;    // First todo in 'pinnedList'
                const todoToDropEl = fixture.debugElement.queryAll(By.css('li'))[2].nativeElement;    // Third todo in 'pinnedList'
                const handleEl = fixture.debugElement.queryAll(By.css('.handle'))[0].nativeElement;

                // console.log(`%c'#view tests' in 'TodoListComponent' todoToDragEl:`, 'color: teal;', todoToDragEl);
                // console.log(`%c'#view tests' in 'TodoListComponent' todoToDropEl:`, 'color: teal;', todoToDropEl);
                // console.log(`%c'#view tests' in 'TodoListComponent' handleEl:`, 'color: teal;', handleEl);

                // Act
                triggerEvent(handleEl, 'mousedown', 'MouseEvent');
                triggerEvent(todoToDragEl, 'dragstart', 'MouseEvent');
                triggerEvent(todoToDropEl, 'dragenter', 'MouseEvent');
                triggerEvent(handleEl, 'mouseup', 'MouseEvent');
                triggerEvent(todoToDragEl, 'drop', 'MouseEvent');
                fixture.detectChanges();

                // Assert
                expect(component.todosToView[0].map(todo => todo.id)).toEqual([2, 3, 1]);
            }));

            it(`shouldn't move todo from 'unpinnedList' to 'pinnedList' (async)`, async(() => {
                // Arrange
                fixture.detectChanges();

                const todoToDragEl = fixture.debugElement.queryAll(By.css('li'))[0].nativeElement;    // First todo in 'pinnedList'
                const todoToDropEl = fixture.debugElement.queryAll(By.css('li'))[3].nativeElement;    // First todo in 'unpinnedList'
                const handleEl = fixture.debugElement.queryAll(By.css('.handle'))[0].nativeElement;

                // console.log(`%c'#view tests' in 'TodoListComponent' todoToDragEl:`, 'color: teal;', todoToDragEl);
                // console.log(`%c'#view tests' in 'TodoListComponent' todoToDropEl:`, 'color: teal;', todoToDropEl);
                // console.log(`%c'#view tests' in 'TodoListComponent' handleEl:`, 'color: teal;', handleEl);

                // Act
                triggerEvent(handleEl, 'mousedown', 'MouseEvent');
                triggerEvent(todoToDragEl, 'dragstart', 'MouseEvent');
                triggerEvent(todoToDropEl, 'dragenter', 'MouseEvent');
                triggerEvent(handleEl, 'mouseup', 'MouseEvent');
                triggerEvent(todoToDragEl, 'drop', 'MouseEvent');
                fixture.detectChanges();

                // Assert
                expect(component.todosToView[0].map(todo => todo.id)).toEqual([1, 2, 3]);
                expect(component.todosToView[1].map(todo => todo.id)).toEqual([4, 5, 6]);
            }));

            it(`shouldn't move todo from 'completedList' to 'pinnedList' (async)`, async(() => {
                // Arrange
                fixture.detectChanges();

                const todoToDragEl = fixture.debugElement.queryAll(By.css('li'))[0].nativeElement;    // First todo in 'pinnedList'
                const todoToDropEl = fixture.debugElement.queryAll(By.css('li'))[6].nativeElement;    // First todo in 'completedList'
                const handleEl = fixture.debugElement.queryAll(By.css('.handle'))[0].nativeElement;

                // console.log(`%c'#view tests' in 'TodoListComponent' todoToDragEl:`, 'color: teal;', todoToDragEl);
                // console.log(`%c'#view tests' in 'TodoListComponent' todoToDropEl:`, 'color: teal;', todoToDropEl);
                // console.log(`%c'#view tests' in 'TodoListComponent' handleEl:`, 'color: teal;', handleEl);

                // Act
                triggerEvent(handleEl, 'mousedown', 'MouseEvent');
                triggerEvent(todoToDragEl, 'dragstart', 'MouseEvent');
                triggerEvent(todoToDropEl, 'dragenter', 'MouseEvent');
                triggerEvent(handleEl, 'mouseup', 'MouseEvent');
                triggerEvent(todoToDragEl, 'drop', 'MouseEvent');
                fixture.detectChanges();

                // Assert
                expect(component.todosToView[0].map(todo => todo.id)).toEqual([1, 2, 3]);
                expect(component.todosToView[2].map(todo => todo.id)).toEqual([7, 8, 9]);
            }));

            it(`shouldn't move todo from 'completedList' to 'unpinnedList' (async)`, async(() => {
                // Arrange
                fixture.detectChanges();

                const todoToDragEl = fixture.debugElement.queryAll(By.css('li'))[3].nativeElement;    // First todo in 'unpinnedList'
                const todoToDropEl = fixture.debugElement.queryAll(By.css('li'))[6].nativeElement;    // First todo in 'completedList'
                const handleEl = fixture.debugElement.queryAll(By.css('.handle'))[3].nativeElement;

                // console.log(`%c'#view tests' in 'TodoListComponent' todoToDragEl:`, 'color: teal;', todoToDragEl);
                // console.log(`%c'#view tests' in 'TodoListComponent' todoToDropEl:`, 'color: teal;', todoToDropEl);
                // console.log(`%c'#view tests' in 'TodoListComponent' handleEl:`, 'color: teal;', handleEl);

                // Act
                triggerEvent(handleEl, 'mousedown', 'MouseEvent');
                triggerEvent(todoToDragEl, 'dragstart', 'MouseEvent');
                triggerEvent(todoToDropEl, 'dragenter', 'MouseEvent');
                triggerEvent(handleEl, 'mouseup', 'MouseEvent');
                triggerEvent(todoToDragEl, 'drop', 'MouseEvent');
                fixture.detectChanges();

                // Assert
                expect(component.todosToView[1].map(todo => todo.id)).toEqual([4, 5, 6]);
                expect(component.todosToView[2].map(todo => todo.id)).toEqual([7, 8, 9]);
            }));
        });

        describe(`div.completed-todos:`, () => {
            it(`'mouseenter' on 'div.completed-todos' should call method 'setCompletedTodosHoverState()' (async)`, async(() => {
                // Arrange

                // Act
                spyOn(component, 'setCompletedTodosHoverState');

                // Set div 'mouseenter' hover state
                divCompletedTodosEl.triggerEventHandler('mouseenter', null);
                fixture.detectChanges();

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.setCompletedTodosHoverState).toHaveBeenCalled();
                });
            }));

            it(`'mouseleave' on 'div.completed-todos' should call method 'setCompletedTodosHoverState()' (async)`, async(() => {
                // Arrange

                // Act
                spyOn(component, 'setCompletedTodosHoverState');

                // Set div 'mouseleave' hover state
                divCompletedTodosEl.triggerEventHandler('mouseleave', null);
                fixture.detectChanges();

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.setCompletedTodosHoverState).toHaveBeenCalled();
                });
            }));

            it(`clicking on div.completed-todos should call method 'clearCompleted()' (async)`, async () => {
                // Arrange

                // Act
                spyOn(component, 'collapseCompletedTodos');
                if (divCompletedTodosEl instanceof HTMLElement) {
                    divCompletedTodosEl.click();
                } else {
                    divCompletedTodosEl.triggerEventHandler('click', { button: 0 });
                }

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.collapseCompletedTodos).toHaveBeenCalled();
                });
            });
        });

        describe(`svg.icon-broom:`, () => {
            it(`'mouseenter' on 'svg.icon-broom' should call method 'setClearCompletedHoverState()' (async)`, async(() => {
                // Arrange

                // Act
                spyOn(component, 'setClearCompletedHoverState');

                // Set svg 'mouseenter' hover state
                svgBroomEl.triggerEventHandler('mouseenter', null);
                fixture.detectChanges();

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.setClearCompletedHoverState).toHaveBeenCalled();
                });
            }));

            it(`'mouseleave' on 'svg.icon-broom' should call method 'setClearCompletedHoverState()' (async)`, async(() => {
                // Arrange

                // Act
                spyOn(component, 'setClearCompletedHoverState');

                // Set svg 'mouseleave' hover state
                svgBroomEl.triggerEventHandler('mouseleave', null);
                fixture.detectChanges();

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.setClearCompletedHoverState).toHaveBeenCalled();
                });
            }));

            it(`clicking on svg.icon-broom should call method 'clearCompleted()' (async)`, async () => {
                // Arrange

                // Act
                spyOn(component, 'clearCompleted');
                if (svgBroomEl instanceof HTMLElement) {
                    svgBroomEl.click();
                } else {
                    svgBroomEl.triggerEventHandler('click', { button: 0 });
                }

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.clearCompleted).toHaveBeenCalled();
                });
            });
        });
    });

    function triggerEvent(elem: HTMLElement, eventName: string, eventType: string) {
        const event: Event = document.createEvent(eventType);
        event.initEvent(eventName, true, true);
        elem.dispatchEvent(event);
    }
});
