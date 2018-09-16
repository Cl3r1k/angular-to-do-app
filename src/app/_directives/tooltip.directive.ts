import { Directive, Input, ElementRef, Renderer2, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: '[appTooltipDirective]'
})
export class TooltipDirective implements OnDestroy {

    private _disabled = false;
    private _showDelay = 300;         // The default value for show delay is 300
    private _animationDelay = 500;    // The default value for animation delay is 500
    private _placement = 'top';       // The default value for placement is 'top'
    private _toolTipTitle: string;
    tooltip: HTMLElement;
    offset = 10;                      // Distance between parent element and tooltip
    isHidePending = false;
    hideTimeoutId: number;
    showTimeoutId: number;

    /** Title of the tooltip */
    @Input('appTooltipDirective') set toolTipTitle(value: string) {
        if (value) {
            this._toolTipTitle = value;
        }
    }

    /** Placement of the tooltip */
    @Input('placement') set placement(value: string) {
        if (value) {
            this._placement = value;
        }
    }

    /** Animation delay of the tooltip */
    @Input('animationDelay')
    get animationDelay(): number {
        return this._animationDelay;
    }
    set animationDelay(value: number) {
        if (value) {
            this._animationDelay = value;
        }
    }

    /** Show delay of the tooltip */
    @Input('showDelay')
    get showDelay(): number {
        return this._showDelay;
    }
    set showDelay(value: number) {
        if (value) {
            this._showDelay = value;
        }
    }

    /** Disables the display of the tooltip. */
    @Input('tooltipDisabled')
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }

    // TODO: Consider to use Renderer3
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        if (this._disabled || !this._toolTipTitle) {
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
        this.clearTimeouts();

        this.create();
        this.setPosition();

        this.showTimeoutId = window.setTimeout(() => {
            this.renderer.addClass(this.tooltip, 'tooltip-show');
        }, this._showDelay);
    }

    hide() {
        if (!this.isHidePending) {
            clearTimeout(this.hideTimeoutId);
            this.clearTimeouts();

            this.isHidePending = true;
            this.renderer.removeClass(this.tooltip, 'tooltip-show');
            this.hideTimeoutId = window.setTimeout(() => {
                this.renderer.removeChild(document.body, this.tooltip);
                this.tooltip = null;
                this.isHidePending = false;
            }, this._animationDelay);
        }
    }

    create() {
        this.tooltip = this.renderer.createElement('span');

        this.renderer.appendChild(this.tooltip, this.renderer.createText(this._toolTipTitle));
        this.renderer.appendChild(document.body, this.tooltip);

        this.renderer.addClass(this.tooltip, 'tooltip');
        this.renderer.addClass(this.tooltip, `tooltip-${this._placement}`);

        // Setup delay
        this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this._animationDelay}ms`);
        this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this._animationDelay}ms`);
        this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this._animationDelay}ms`);
        this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this._animationDelay}ms`);
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

        if (this._placement === 'top') {
            top = hostPos.top - tooltipPos.height - this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this._placement === 'bottom') {
            top = hostPos.bottom + this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this._placement === 'left') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.left - tooltipPos.width - this.offset;
        }

        if (this._placement === 'right') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.right + this.offset;
        }

        // If scrolling occurs, the top of the tooltip element should reflect the vertical scrolling coordinate value.
        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }

    clearTimeouts() {
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
        }
    }

    ngOnDestroy() {
        if (this.tooltip) {
            this.hide();
        }
    }

}
