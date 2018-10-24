import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateTodosGuard } from '@app/_guards/can-activate-todos.guard';

class MockRouter {
    navigate(path) { }
}

describe('Guard: CanActivateTodosGuard', () => {

    let todosGuard: CanActivateTodosGuard;
    let authService;
    let router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [CanActivateTodosGuard]
        });
    });

    it('should ...', inject([CanActivateTodosGuard], (guard: CanActivateTodosGuard) => {
        // Arrange

        // Act

        // Assert
        expect(guard).toBeTruthy();
    }));

    it(`should return true for a logged in user`, () => {
        // Arrange
        authService = { isSignedIn: () => true };
        router = new MockRouter();
        todosGuard = new CanActivateTodosGuard(authService, router);

        // Act

        // Assert
        expect(todosGuard.canActivate(null, null)).toEqual(true);
    });

    it(`should navigate to 'sign-in' page for a logged out user`, () => {
        // Arrange
        authService = { isSignedIn: () => false };
        router = new MockRouter();
        todosGuard = new CanActivateTodosGuard(authService, router);
        spyOn(router, 'navigate');

        // Act

        // Assert
        expect(todosGuard.canActivate(null, null)).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/sign-in']);
    });
});
