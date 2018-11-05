import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Models
import { ToDo } from '@app/_models/to-do';

// Directives
import { RouterLinkActiveStubsDirective } from '@app/_testing/router-stubs.directive';

// Components
import { TodoListFooterComponent } from '@app/todo-list-footer/todo-list-footer.component';

describe('Component: TodoListFooterComponent', () => {
    let component: TodoListFooterComponent;
    let fixture: ComponentFixture<TodoListFooterComponent>;
    let expectedtodosAllAmount: number;
    let expectedtodosActiveAmount: number;
    let expectedtodosCompletedAmount: number;
    let linkDes;
    let links;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListFooterComponent, RouterLinkActiveStubsDirective]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListFooterComponent);
        component = fixture.componentInstance;

        component.todosAllAmount = 1;            // Lets count that we have more than 0 todo
        component.todosCompletedAmount = 1;      // Lets count that we have more than 0 completed todo
        fixture.detectChanges();

        expectedtodosAllAmount = 11;                                 // For example
        expectedtodosActiveAmount = 6;                               // For example
        expectedtodosCompletedAmount = 5;                            // For example
        component.todosAllAmount = expectedtodosAllAmount;
        component.todosActiveAmount = expectedtodosActiveAmount;
        component.todosCompletedAmount = expectedtodosCompletedAmount;
        fixture.detectChanges();

        // find DebugElements with an attached RouterLinkActiveStubsDirective
        linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkActiveStubsDirective));

        // get the attached link directive instances using the DebugElement injectors
        links = linkDes.map(de => de.injector.get(RouterLinkActiveStubsDirective) as RouterLinkActiveStubsDirective);
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

    it(`can get RouterLinkActive from the template (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(links.length).toBe(3, 'should have 3 links');
        expect(links[0].routerLinkActiveOptions['exact']).toBe(true, '1st should have routerLinkActiveOptions={exact:true}');
        expect(links[1].routerLinkActiveOptions['exact']).toBe(false, '2nd should have routerLinkActiveOptions={exact:false}');
        expect(links[2].routerLinkActiveOptions['exact']).toBe(false, '3rd should have routerLinkActiveOptions={exact:false}');
    }));
});
