import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';

import { TodosComponent } from '@app/todos/todos.component';

import { ToDo } from '@app/_models/to-do';
import { TodoTitleComponent } from '@app/todo-title/todo-title.component';
import { TodoListHeaderComponent } from '@app/todo-list-header/todo-list-header.component';
import { TodoListComponent } from '@app/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todo-list/todo-list-item/todo-list-item.component';
import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListItemEditComponent } from '@app/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListFooterComponent } from '@app/todo-list-footer/todo-list-footer.component';

// Services
import { TodoService } from '@app/_services/todo.service';
import { ApiMockService } from '@app/_services/api-mock.service';
import { ApiService } from '@app/_services/api.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';
import { IndexedDbMockService } from '@app/_services/indexed-db-mock.service';
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';

// Routers
import { ActivatedRoute } from '@angular/router';

// Modules
import { DndModule, DragDropService, DragDropConfig, DragDropSortableService } from 'ng2-dnd';
import { MatDialogModule } from '@angular/material';

describe(`TodosComponent`, () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let expectedTodo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
                DndModule,
                MatDialogModule
            ],
            declarations: [
                TodosComponent,
                TodoTitleComponent,
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
                    provide: IndexedDbService,
                    useClass: IndexedDbMockService
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        data: Observable.of({
                            todos: []
                        }),
                        routeConfig: {
                            path: 'active'
                        }
                    }
                },
                DragDropService,
                DragDropConfig,
                DragDropSortableService,
                {
                    provide: TodoOrderService,
                    useClass: TodoOrderMockService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;

        expectedTodo = new ToDo({ id: 1, title: 'Test 1', complete: false });
        fixture.detectChanges();
    });

    // tslint:disable-next-line:max-line-length
    it(`Should create the app, used:  Components(TodoTitleComponent, TodoListHeaderComponent, TodoListComponent, TodoListFooterComponent, TodoListItemComponent, TodoListItemViewComponent, TodoListItemEditComponent) Services(ApiMockService, ApiService, IndexedDbMockService) Modules(DndModule, MatDialogModule) (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it(`Should create the app with 'activeRouteState' is 1 according to routeConfig: { path } (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.activeRouteState).toBe(1, `incoming routeConfig: { path === 'active' }`);
    }));

    // TODO: Rewrite test for 'TodosComponent' (currently not complete)
});
