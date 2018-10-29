import { TestBed, async } from '@angular/core/testing';

import { Utils } from '@app/_common/utils';


describe(`Class: Utils`, () => {
    it(`Should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(new Utils()).toBeTruthy();
    }));

    describe(`#randomRangeInteger():`, () => {
        it(`Should return value from val1 to val2 (async)`, async(() => {
            // Arrange
            let result: number;
            const val1 = 0;
            const val2 = 10;

            // Act
            result = new Utils().randomRangeInteger(val1, val2);

            // Assert
            expect(result).toBeGreaterThanOrEqual(val1);
            expect(result).toBeLessThanOrEqual(val2);
        }));
    });
});
