import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemEditComponent } from './todo-list-item-edit.component';

describe('TodoListItemEditComponent', () => {
  let component: TodoListItemEditComponent;
  let fixture: ComponentFixture<TodoListItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
