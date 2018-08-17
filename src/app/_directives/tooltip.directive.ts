import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appTooltipDirective]'
})
export class TooltipDirective {

    @Input('appTooltipDirective') toolTipTitle: string;
    @Input() placement: string;
    @Input() delay: string;
    tooltip: HTMLElement;
    // Distance between parent element and tooltip
    offset = 10;

    // TODO: Consider to use Renderer3
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        if (!this.tooltip) {
            this.show();
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.tooltip) {
            this.hide();
        }
    }

    show() {
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltip, 'tooltip-show');
    }

    hide() {
        this.renderer.removeClass(this.tooltip, 'tooltip-show');
        window.setTimeout(() => {
            this.renderer.removeChild(document.body, this.tooltip);
            this.tooltip = null;
        }, this.delay);
    }

    create() {
        //
    }

    setPosition() {
        //
    }

}
