import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMoreComponent } from './dialog-more.component';

describe('DialogMoreComponent', () => {
  let component: DialogMoreComponent;
  let fixture: ComponentFixture<DialogMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
