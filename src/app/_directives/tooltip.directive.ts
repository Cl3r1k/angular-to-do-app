import { Directive, Input, ElementRef, Renderer2, HostListener, OnDestroy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: '[appTooltipDirective]'
})
export class TooltipDirective implements OnDestroy {

    private _disabled = false;

    @Input('appTooltipDirective') toolTipTitle: string;
    @Input() placement: string;
    @Input() delay: string;

    /** Disables the display of the tooltip. */
    @Input('tooltipDisabled')
    get disabled(): boolean { return this._disabled; }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }

    tooltip: HTMLElement;
    // Distance between parent element and tooltip
    offset = 10;
    isHidePending = false;
    hideTimeout: number;

    // TODO: Consider to use Renderer3
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        if (this._disabled || !this.toolTipTitle) {
            return;
        }

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
        if (!this.isHidePending) {
            clearTimeout(this.hideTimeout);

            this.isHidePending = true;
            this.renderer.removeClass(this.tooltip, 'tooltip-show');
            this.hideTimeout = window.setTimeout(() => {
                this.renderer.removeChild(document.body, this.tooltip);
                this.tooltip = null;
                this.isHidePending = false;
            }, this.delay);
        }
    }

    create() {
        this.tooltip = this.renderer.createElement('span');

        this.renderer.appendChild(this.tooltip, this.renderer.createText(this.toolTipTitle));
        this.renderer.appendChild(document.body, this.tooltip);

        this.renderer.addClass(this.tooltip, 'tooltip');
        this.renderer.addClass(this.tooltip, `tooltip-${this.placement}`);

        // Setup delay
        this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
    }

    setPosition() {
        // Host size and destination info
        const hostPos = this.el.nativeElement.getBoundingClientRect();

        // Tooltip size and destination info
        const tooltipPos = this.tooltip.getBoundingClientRect();

        // scroll top of window
        // The getBoundingClientRect method returns the relative position in the viewport.
        // If scrolling occurs, the top of the tooltip element should reflect the vertical scrolling coordinate value.
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let top, left;

        // FIXME: Position of tooltip a little shifted
        // The problem is in sticky-grid-footer (for style height: 100%)
        // Parent top/left the same when its height is not 100%
        // If there is the scrollbar - position of toolbar is OK.
        // Dig deeper, in html when matTooltip showed for example
        // In matTooltip 'left' attr the same in when not set 'height: 100%'
        // Look at 'https://github.com/angular/material2/blob/master/src/lib/tooltip/tooltip.ts'

        if (this.placement === 'top') {
            top = hostPos.top - tooltipPos.height - this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this.placement === 'bottom') {
            top = hostPos.bottom + this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this.placement === 'left') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.left - tooltipPos.width - this.offset;
        }

        if (this.placement === 'right') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.right + this.offset;
        }

        // If scrolling occurs, the top of the tooltip element should reflect the vertical scrolling coordinate value.
        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }

    ngOnDestroy() {
        if (this.tooltip) {
            this.hide();
        }
    }

}
