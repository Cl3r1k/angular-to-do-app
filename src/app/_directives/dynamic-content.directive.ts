import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDynamicContentDirective]'
})
export class DynamicContentDirective {

    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.style.fontWeight = 'bold';
    }

}
