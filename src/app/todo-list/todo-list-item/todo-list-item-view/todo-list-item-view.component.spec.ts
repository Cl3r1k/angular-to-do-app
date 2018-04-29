import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ToDo } from '@app/_models/to-do';

import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';

describe('TodoListItemViewComponent', () => {
    let component: TodoListItemViewComponent;
    let fixture: ComponentFixture<TodoListItemViewComponent>;
    let toggleEl;
    let labelEl;
    // let editEl;
    let moreEl;
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

        expectedTodo = new ToDo({ id: 1, title: 'Test title in TodoListItemViewComponent', complete: false });
        component.todo = expectedTodo;                    // Lets count that we todo with 'complete' = false
        fixture.detectChanges();

        // console.log(`%c'beforeEach()' in 'TodoListItemViewComponent' component.todo:`, 'color: teal;', component.todo);

        toggleEl = fixture.debugElement.query(By.css('input[type=checkbox]'));        // Find toggle checkbox element
        labelEl = fixture.debugElement.query(By.css('label'));                        // Find label element
        // editEl = fixture.debugElement.query(By.css('svg.icon-pencil-edit'));       // Find edit icon element
        moreEl = fixture.debugElement.query(By.css('svg.icon-more_horiz'));           // Find more icon element
        pinEl = fixture.debugElement.query(By.css('svg.icon-pin'));                   // Find pin icon element

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
        component.toggleCompleteTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to 'toggle' event
        component.toggleTodoComplete(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should emit 'edit' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.editTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to 'edit' event
        component.editTodo(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should emit 'more' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.moreTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to 'more' event
        component.showMore(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should emit 'pin' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.pinTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to 'pin' event
        component.pinTodo(expectedTodo);

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

    describe(`#parseTitle`, () => {
        it(`Should return initial string without changes and 'priorityColor' should be 'transparent' (async)`, async(() => {
            // Arrange
            const todo: ToDo = new ToDo({title: 'Add more todos!'});

            // Act
            const result = component.parseTitle(todo);

            // Assert
            expect(result).toEqual('Add more todos!');
            expect(component.priorityColor).toEqual('transparent');
        }));

        it(`Should return initial string(contains a!) without changes and 'priorityColor' should be 'transparent' (async)`, async(() => {
            // Arrange
            const todo: ToDo = new ToDo({title: 'Add more todos a!'});

            // Act
            const result = component.parseTitle(todo);

            // Assert
            expect(result).toEqual('Add more todos a!');
            expect(component.priorityColor).toEqual('transparent');
        }));

        it(`Should return parsed string with changes and 'priorityColor' should be 'red' (async)`, async(() => {
            // Arrange
            const todo: ToDo = new ToDo({title: 'Add more todos !'});

            // Act
            const result = component.parseTitle(todo);

            // Assert
            expect(result).toEqual('Add more todos');
            expect(component.priorityColor).toEqual('red');
        }));

        it(`Should return parsed string with changes and 'priorityColor' should be 'orange' (async)`, async(() => {
            // Arrange
            const todo: ToDo = new ToDo({title: 'Add more todos ! !!'});

            // Act
            const result = component.parseTitle(todo);

            // Assert
            expect(result).toEqual('Add more todos !');
            expect(component.priorityColor).toEqual('orange');
        }));

        it(`Should return parsed string(contains ! in middle) with changes and 'priorityColor' should be 'tomato' (async)`, async(() => {
            // Arrange
            const todo: ToDo = new ToDo({title: 'Add more ! todos ! !!!'});

            // Act
            const result = component.parseTitle(todo);

            // Assert
            expect(result).toEqual('Add more ! todos !');
            expect(component.priorityColor).toEqual('tomato');
        }));

        it(`Should return parsed string(contains many !) with changes and 'priorityColor' should be 'paleturquoise' (async)`, async(() => {
            // Arrange
            const todo: ToDo = new ToDo({title: 'Add more todos ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'});

            // Act
            const result = component.parseTitle(todo);

            // Assert
            expect(result).toEqual('Add more todos !');
            expect(component.priorityColor).toEqual('paleturquoise');
        }));
    });

    describe(`#view tests:`, () => {

        describe(`checkbox.toggle:`, () => {
            it(`'mouseenter' on 'checkbox.toggle' should call method 'setCompleteHover()' (async)`, async(() => {
                // Arrange

                // Act
                spyOn(component, 'setCompleteHover');

                // Set svg hover state
                toggleEl.triggerEventHandler('mouseenter', null);
                fixture.detectChanges();

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.setCompleteHover).toHaveBeenCalled();
                });
            }));

            it(`'mouseleave' on 'checkbox.toggle' should call method 'setCompleteHover()' (async)`, async(() => {
                // Arrange
                // Firstly set 'mouseenter' state for 'checkbox.toggle'
                toggleEl.triggerEventHandler('mouseenter', null);
                fixture.detectChanges();

                // Act
                spyOn(component, 'setCompleteHover');

                // Set svg hover state
                toggleEl.triggerEventHandler('mouseleave', null);
                fixture.detectChanges();

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.setCompleteHover).toHaveBeenCalled();
                });
            }));

            it(`clicking on 'checkbox.toggle' should call method 'toggleTodoComplete()' event (async)`, async () => {
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
        });

        // TODO: Delete tests and variable for svg.icon-pencil-edit later
        // it(`clicking on svg.icon-pencil-edit should call method 'editTodo()' (async)`, async () => {
        //     // Arrange

        //     // Act
        //     spyOn(component, 'editTodo');
        //     if (editEl instanceof HTMLElement) {
        //         editEl.click();
        //     } else {
        //         editEl.triggerEventHandler('click', { button: 0 });
        //     }

        //     // Assert
        //     fixture.whenStable().then(() => {
        //         expect(component.editTodo).toHaveBeenCalled();
        //     });
        // });

        describe(`label:`, () => {
            it(`'dblclick' on 'label' should call method 'editTodo()' (async)`, async () => {
                // Arrange

                // Act
                spyOn(component, 'editTodo');
                labelEl.triggerEventHandler('dblclick', new MouseEvent('dblclick'));

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.editTodo).toHaveBeenCalled();
                });
            });
        });

        describe(`svg.icon-more_horiz:`, () => {
            it(`clicking on 'svg.icon-more_horiz' should call method 'showMore()' (async)`, async () => {
                // Arrange

                // Act
                spyOn(component, 'showMore');
                if (moreEl instanceof HTMLElement) {
                    moreEl.click();
                } else {
                    moreEl.triggerEventHandler('click', { button: 0 });
                }

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.showMore).toHaveBeenCalled();
                });
            });
        });

        describe(`svg.icon-pin:`, () => {
            it(`clicking on 'svg.icon-pin' should call method 'pinTodo()' (async)`, async () => {
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
});
