import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { TodoTitleComponent } from '@app/todo-title/todo-title.component';

describe('Component: TodoTitleComponent', () => {
    let component: TodoTitleComponent;
    let fixture: ComponentFixture<TodoTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoTitleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should display "Todo" in h1 tag (async)', async(() => {
        // Arrange
        const compiled = fixture.debugElement.nativeElement;

        // Act

        // Assert
        expect(compiled.querySelector('h1').textContent).toContain('Todo');
    }));
});
