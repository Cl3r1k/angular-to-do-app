import { Directive, OnDestroy, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[appTooltip2Directive]'
})
export class Tooltip2Directive implements OnDestroy {

    @Input() tooltipTitle = '';

    constructor(private elementRef: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter(): void {
        // Show tooltip
        const elementPosition = this.elementRef.nativeElement.getBoundingClientRect();
        console.log('elementPosition: ', elementPosition);
    }

    @HostListener('mouseleave') onMouseLeave(): void {
        // Hide tooltip
    }

    ngOnDestroy() {
        // Hide tooltip
    }

}
