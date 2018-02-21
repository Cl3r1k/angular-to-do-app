import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTitleComponent } from '@app/todo-title/todo-title.component';

describe('TodoTitleComponent', () => {
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
