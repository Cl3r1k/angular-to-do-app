import { SafePipe } from '@app/_pipes/safe.pipe';

describe('SafePipe', () => {
    it('create an instance', () => {
        const pipe = new SafePipe(null);
        expect(pipe).toBeTruthy();
    });
});
