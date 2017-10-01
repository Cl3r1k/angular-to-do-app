import { TestBed, inject, async } from '@angular/core/testing';

import { Component } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MockTodosComponent
            ],
            providers: [ AppComponent ]
        }).compileComponents();
    }));

    describe('App: Todo', () => {
        it('should create the app (MockTodosComponent used)', inject([AppComponent], (app: AppComponent) => {
            // Arrange

            // Act

            // Assert
            expect(app).toBeTruthy();
        }));
    });
});

@Component({
    selector: 'app-todo',
    template: ``
})
class MockTodosComponent { }
