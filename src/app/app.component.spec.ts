import { TestBed, inject, async } from '@angular/core/testing';

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

// TODO: Replace NO_ERRORS_SCHEMA with improved test
describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ NO_ERRORS_SCHEMA ],
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
