import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Models
import { ToDo } from '@app/_models/to-do';

// Components
import { TodoListItemComponent } from '@app/todo-list/todo-list-item/todo-list-item.component';
import { TodoListItemEditComponent } from '@app/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';

// Pipes
import { SafePipe } from '@app/_pipes/safe.pipe';
import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';

// Services
import { TagService } from '@app/_services/tag.service';
import { TagMockService } from '@app/_services/tag-mock.service';

describe('Component: TodoListItemComponent', () => {
    let component: TodoListItemComponent;
    let fixture: ComponentFixture<TodoListItemComponent>;
    let expectedTodo: ToDo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoListItemComponent,
                TodoListItemViewComponent,
                TodoListItemEditComponent,
                SafePipe,
                ParseTagPipe
            ],
            imports: [FormsModule],
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
        fixture = TestBed.createComponent(TodoListItemComponent);
        component = fixture.componentInstance;

        expectedTodo = new ToDo({ id: 1, title: 'Test title in TodoListItemComponent', complete: false });
        component.todo = expectedTodo;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
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
        component.toggleCompleteTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to toggle event
        component.toggleTodoComplete(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    it(`should emit 'update' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.updateTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to update event
        component.updateTodo(expectedTodo);

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

    it(`should emit 'pin' event (async)`, async(() => {
        // Arrange
        let todo: ToDo;

        // Act
        component.pinTodoListItemEmitter.subscribe((value) => todo = value);    // Subscribe to pin event
        component.pinTodo(expectedTodo);

        // Assert
        expect(todo).toEqual(expectedTodo);
    }));

    // TODO: Update test with 'pinned-list', 'unpinned-list', 'completed-list'
});
