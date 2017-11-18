import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToDo } from '@app/_models/to-do';

import { TodoListFooterComponent } from '@app/todo-list-footer/todo-list-footer.component';

describe('TodoListFooterComponent', () => {
    let component: TodoListFooterComponent;
    let fixture: ComponentFixture<TodoListFooterComponent>;
    let footerEl;
    let expectedIncompletedTodosCount: number;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListFooterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListFooterComponent);
        component = fixture.componentInstance;
        footerEl = fixture.debugElement.query(By.css('footer'));    // Find footer element

        expectedIncompletedTodosCount = 11;    // For example
        component.todosCount = expectedIncompletedTodosCount;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it('should be equal to expectedTodos @Input event (async)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.todosCount).toEqual(expectedIncompletedTodosCount);
    }));
});
