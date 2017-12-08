import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToDo } from '@app/_models/to-do';

import { TodoListFooterComponent } from '@app/todo-list-footer/todo-list-footer.component';
import { RouterLinkActiveStubsDirective } from '@app/_testing/router-stubs.directive';

describe('TodoListFooterComponent', () => {
    let component: TodoListFooterComponent;
    let fixture: ComponentFixture<TodoListFooterComponent>;
    let btnClearEl;
    let expectedtodosAllAmount: number;
    let expectedtodosActiveAmount: number;
    let expectedtodosCompletedAmount: number;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListFooterComponent, RouterLinkActiveStubsDirective]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListFooterComponent);
        component = fixture.componentInstance;
        btnClearEl = fixture.debugElement.nativeElement.querySelector('.btn-clear');    // Find button.btn-clear element

        expectedtodosAllAmount = 11;                                 // For example
        expectedtodosActiveAmount = 6;                               // For example
        expectedtodosCompletedAmount = 5;                            // For example
        component.todosAllAmount = expectedtodosAllAmount;
        component.todosActiveAmount = expectedtodosActiveAmount;
        component.todosCompletedAmount = expectedtodosCompletedAmount;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it('should be equal to expectedtodosAllAmount @Input event (async)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.todosAllAmount).toEqual(expectedtodosAllAmount);
    }));

    it('should be equal to expectedtodosActiveAmount @Input event (async)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.todosActiveAmount).toEqual(expectedtodosActiveAmount);
    }));

    it('should be equal to expectedtodosCompletedAmount @Input event (async)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.todosCompletedAmount).toEqual(expectedtodosCompletedAmount);
    }));

    it(`should emit 'clear' event (async)`, async(() => {
        // Arrange
        let state: boolean;

        // Act
        component.clearTodoListFooterEmitter.subscribe((value) => state = value);    // Subscribe to 'clear' event
        component.clearCompleted(true);

        // Assert
        expect(state).toEqual(true);
    }));

    describe(`#view tests`, () => {
        it(`clicking on button.btn-clear should call method 'clearCompleted()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'clearCompleted');
            btnClearEl.click();

            // Assert
            fixture.whenStable().then(() => {
                expect(component.clearCompleted).toHaveBeenCalled();
            });
        });
    });
});
