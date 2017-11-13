import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { AppRoutingModule } from '@app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '@app/app.module';
import { AppComponent } from '@app/app.component';
import { TodosComponent } from '@app/todos/todos.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

import { Component } from '@angular/core';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'todos',
                        component: TodosComponent
                    },
                    {
                        path: '**',
                        component: PageNotFoundComponent
                    }
                ]),
                AppModule
            ],
            providers: [ { provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();
    }));

    describe('App: Todo', () => {
        it('should be able to navigate to `/` (async)', async(() => {
            // Arrange
            const injector = getTestBed();
            const router = injector.get(Router);
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();

            // Act

            // Assert
            router.navigate(['/'])
                .then(() => {
                    expect(location.pathname.endsWith('/todos')).toBe(true);
                });
        }));

        it('should be able to navigate to `/todos` (async)', async(() => {
            // Arrange
            const injector = getTestBed();
            const router = injector.get(Router);
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();

            // Act

            // Assert
            router.navigate(['/todos'])
                .then(() => {
                    expect(location.pathname.endsWith('/todos')).toBe(true);
                });
        }));

        it('should be able to navigate to `/somepath` (async)', async(() => {
            // Arrange
            const injector = getTestBed();
            const router = injector.get(Router);
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();

            // Act

            // Assert
            router.navigate(['/somepath'])
                .then(() => {
                    expect(location.pathname.toString()).toEqual('/somepath');
                });
        }));
    });
});
