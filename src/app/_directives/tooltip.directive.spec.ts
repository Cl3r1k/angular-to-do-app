import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
    it('should create an instance', () => {
        // TODO: Update test and use proper value in constructor, not null
        const directive = new TooltipDirective(null, null);
        expect(directive).toBeTruthy();
    });
});
