import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemViewComponent } from './todo-list-item-view.component';

describe('TodoListItemViewComponent', () => {
    let component: TodoListItemViewComponent;
    let fixture: ComponentFixture<TodoListItemViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListItemViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListItemViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
