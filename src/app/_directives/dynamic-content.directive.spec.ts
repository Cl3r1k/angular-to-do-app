import { TestBed } from '@angular/core/testing';

import { DynamicContentDirective } from '@app/_directives/dynamic-content.directive';

describe(`Directive: DynamicContentDirective`, () => {
    let directive: DynamicContentDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });

        // TODO: replace param 'null' to proper param, and complete tests
        directive = new DynamicContentDirective(null, null);
    });

    it(`create an instance`, () => {
        // Arrange

        // Act

        // Assert
        expect(directive).toBeTruthy();
    });
});
