import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';

describe('ParseTagPipe', () => {
    it('create an instance', () => {
        // TODO: replace param 'null' to proper param, and complete tests
        const pipe = new ParseTagPipe(null);
        expect(pipe).toBeTruthy();
    });
});
