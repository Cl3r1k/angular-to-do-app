import { TestBed } from '@angular/core/testing';

import { FilterTagPipe } from '@app/_pipes/filter-tag.pipe';
// Mocked FilterTagPipe, because in pipe used IndexedDb
import { FilterTagMockPipe } from '@app/_pipes/filter-tag-mock.pipe';

describe(`Pipe: FilterTagPipe`, () => {
    let pipe: FilterTagMockPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: FilterTagPipe,
                    useClass: FilterTagMockPipe
                }]
        });

        pipe = new FilterTagMockPipe();
    });

    it(`create an instance`, () => {
        // Arrange

        // Act

        // Assert
        expect(pipe).toBeTruthy();
    });

    it(`providing no value returns empty template`, () => {
        // Arrange

        // Act

        // Assert
        expect(pipe.transform('')).toBe(`<div class='hashtag' style='background-color: gray;'></div>`);
    });

    it(`providing value '#tag' should returns string with parsed #hastag and color 'gray'`, () => {
        // Arrange

        // Act

        // Assert
        expect(pipe.transform('#tag')).toBe(`<div class='hashtag' style='background-color: gray;'>#tag</div>`);
    });
});
