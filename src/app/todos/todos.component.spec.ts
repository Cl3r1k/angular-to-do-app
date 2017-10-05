import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { TodosComponent } from './todos.component';

import { ToDo } from './../to-do';
import { TodoListItemComponent } from './../todo-list-item/todo-list-item.component';
import { TodoListFooterComponent } from '../todo-list-footer/todo-list-footer.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoListHeaderComponent } from './../todo-list-header/todo-list-header.component';

// Services
import { TodoService } from './../services/todo.service';
import { ApiMockService } from './../services/api-mock.service';
import { ApiService } from './../services/api.service';

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
                TodoListItemComponent
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
