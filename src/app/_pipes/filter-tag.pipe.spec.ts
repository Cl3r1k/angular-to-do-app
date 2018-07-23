import { FilterTagPipe } from '@app/_pipes/filter-tag.pipe';

describe('FilterTagPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterTagPipe(null);
        expect(pipe).toBeTruthy();
    });
});
