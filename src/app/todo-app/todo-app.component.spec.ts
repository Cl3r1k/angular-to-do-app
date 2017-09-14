import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TodoAppComponent } from './todo-app.component';
import { TodoService } from './../todo.service';

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

    it('Должно создать экземпляр объекта', inject([TodoService], (service: TodoService) => {
        // Arrange
        const todoAppComponent = new TodoAppComponent(service);

        // Act

        // Assert
        expect(todoAppComponent).toBeTruthy();
    }));
});
