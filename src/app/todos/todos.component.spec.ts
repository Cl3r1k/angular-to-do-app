import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { TodosComponent } from '@app/todos/todos.component';

import { ToDo } from '@app/_models/to-do';
import { TodoListHeaderComponent } from '@app/todo-list-header/todo-list-header.component';
import { TodoListComponent } from '@app/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todo-list-item/todo-list-item.component';
import { TodoListItemViewComponent } from '@app/todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListItemEditComponent } from '@app/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListFooterComponent } from '@app/todo-list-footer/todo-list-footer.component';

// Services
import { TodoService } from '@app/_services/todo.service';
import { ApiMockService } from '@app/_services/api-mock.service';
import { ApiService } from '@app/_services/api.service';

// Routers
import { ActivatedRoute } from '@angular/router';

describe('TodosComponent', () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [
                TodosComponent,
                TodoListHeaderComponent,
                TodoListComponent,
                TodoListFooterComponent,
                TodoListItemComponent,
                TodoListItemViewComponent,
                TodoListItemEditComponent
            ],
            providers: [TodoService,
                {
                    provide: ApiService,
                    useClass: ApiMockService
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        data: Observable.of({
                            todos: []
                        })
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // tslint:disable-next-line:max-line-length
    it('Should create the app, used: Components(TodoListHeader, TodoList, TodoListFooter, TodoListItem) Services(ApiMockService, ApiService)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));
});
