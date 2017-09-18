import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoAppComponent } from './todo-app.component';
import { TodoService } from './../todo.service';
import { ToDo } from './../to-do';

describe('Compontent: TodoAppComponent', () => {
    let component: TodoAppComponent;
    let fixture: ComponentFixture<TodoAppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [TodoAppComponent],
            providers: [ TodoService ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create the app', async(() => {
        // Arrange
        const fixtureApp = TestBed.createComponent(TodoAppComponent);
        const app = fixtureApp.debugElement.componentInstance;

        // Act

        // Assert
        expect(app).toBeTruthy();
    }));

    it('Should have a newTodo as instance of Todo', async(() => {
        // Arrange
        const fixtureApp = TestBed.createComponent(TodoAppComponent);
        const app = fixtureApp.debugElement.componentInstance;

        // Act

        // Assert
        expect(app.newTodo instanceof ToDo).toBeTruthy();
    }));

    it('Should display "Todo" in h1 tag', async(() => {
        // Arrange
        const fixtureApp = TestBed.createComponent(TodoAppComponent);
        fixtureApp.detectChanges();
        const compiled = fixtureApp.debugElement.nativeElement;

        // Act

        // Assert
        expect(compiled.querySelector('h1').textContent).toContain('Todo');
    }));
});
