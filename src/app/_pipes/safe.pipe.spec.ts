import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SafePipe } from '@app/_pipes/safe.pipe';

describe('Pipe: SafePipe', () => {
    let pipe: SafePipe;
    let sanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DomSanitizer]
        });

        sanitizer = TestBed.get(DomSanitizer);

        pipe = new SafePipe(sanitizer);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    // it(`providing no value returns empty string`, () => {
    //     expect(pipe.transform(`some <span class='tag-class' style='background-color: red;'>#tag</span>`, 'html')).toBe('');
    // });
});
