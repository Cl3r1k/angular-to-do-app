import { TodoListItemComponent } from './../todo-list-item/todo-list-item.component';
import { TodoListFooterComponent } from '../todo-list-footer/todo-list-footer.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoListHeaderComponent } from './../todo-list-header/todo-list-header.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoAppComponent } from './todo-app.component';
import { ToDo } from './../to-do';

// Services
import { TodoService } from './../todo.service';
import { ApiMockService } from '../api-mock.service';
import { ApiService } from './../api.service';

describe('Compontent: TodoAppComponent', () => {
    let component: TodoAppComponent;
    let fixture: ComponentFixture<TodoAppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [
                TodoAppComponent,
                TodoListHeaderComponent,
                TodoListComponent,
                TodoListFooterComponent,
                TodoListItemComponent
            ],
            providers: [TodoService,
                {
                    provide: ApiService,
                    useClass: ApiMockService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoAppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    // tslint:disable-next-line:max-line-length
    it('Should create the app Components(TodoListHeader, TodoList, TodoListFooter, TodoListItem) Services(ApiMockService, ApiService)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));
});
