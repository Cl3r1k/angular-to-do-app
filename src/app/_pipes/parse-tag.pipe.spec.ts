import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';

describe('ParseTagPipe', () => {
    it('create an instance', () => {
        const pipe = new ParseTagPipe(null);
        expect(pipe).toBeTruthy();
    });
});
