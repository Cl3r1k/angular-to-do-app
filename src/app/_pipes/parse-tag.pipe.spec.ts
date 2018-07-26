import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';

describe(`Pipe: ParseTagPipe`, () => {
    let pipe: ParseTagPipe;

    beforeEach(() => {
        // TODO: replace param 'null' to proper param, and complete tests
        // look here (https://codecraft.tv/courses/angular/unit-testing/angular-test-bed/)
        // And use mocked parseTag() (look here https://codecraft.tv/courses/angular/unit-testing/mocks-and-spies/)
        pipe = new ParseTagPipe(null);
    });

    it(`create an instance`, () => {
        expect(pipe).toBeTruthy();
    });

    it(`providing no value returns empty string`, () => {
        expect(pipe.transform('')).toBe('');
    });
});
