import { SafePipe } from '@app/_pipes/safe.pipe';

describe('SafePipe', () => {
    it('create an instance', () => {
        // TODO: replace param 'null' to proper param, and complete tests
        const pipe = new SafePipe(null);
        expect(pipe).toBeTruthy();
    });
});
