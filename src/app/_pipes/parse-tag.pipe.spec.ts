import { TestBed } from '@angular/core/testing';

import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';
// Mocked ParseTagPipe, because in pipe used IndexedDb
import { ParseTagMockPipe } from '@app/_pipes/parse-tag-mock.pipe';

describe(`Pipe: ParseTagPipe`, () => {
    let pipe: ParseTagMockPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ParseTagPipe,
                    useClass: ParseTagMockPipe
                }]
        });

        pipe = new ParseTagMockPipe();
    });

    it(`create an instance`, () => {
        expect(pipe).toBeTruthy();
    });

    it(`providing no value returns empty string`, () => {
        expect(pipe.transform('')).toBe('');
    });

    it(`providing value 'some http://url.com' should returns string with url.span`, () => {
        expect(pipe.transform('some http://url.com')).toBe(`some <a href='http://url.com' target='_blank'>url.com</a>`);
    });

    it(`providing value 'some #tag' should returns string with parsed #hastag`, () => {
        expect(pipe.transform('some #tag')).toBe(`some <span class='tag-class' style='background-color: red;'>#tag</span>`);
    });
});
