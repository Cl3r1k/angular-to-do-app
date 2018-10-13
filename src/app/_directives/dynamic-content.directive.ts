import { Directive, ElementRef, Input, HostListener, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appDynamicContentDirective]'
})
export class DynamicContentDirective implements OnDestroy {

    private _showDelay = 300;         // The default value for show delay is 300
    private _toolTipTitle = 'Ctrl + click to follow link';
    private _placement = 'top';
    private _delay = 500;
    tooltip: HTMLElement;
    offset = 10;                      // Distance between parent element and tooltip
    isHidePending = false;
    hideTimeoutId: number;
    showTimeoutId: number;
    eventPos: any;

    @Input('appDynamicContentDirective') dynamicContent: string;

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

    constructor(private elementRef: ElementRef, public router: Router, private renderer: Renderer2) { }

    @HostListener('click', ['$event']) onclick(e) {

        if (this.tooltip) {
            this.hide();
        }

        if (e.target.classList.contains('tag-class')) {
            const link: string = e.target.innerHTML;

            event.preventDefault();
            event.stopPropagation();

            this.router.navigate(['/todos/filter/hashtag/', link.trim()], { skipLocationChange: true });
        }

        if (e.target.classList.contains('url-class')) {
            const link: string = e.target.innerHTML;

            if (!e.ctrlKey) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }

    @HostListener('mouseover', ['$event']) onMouseOver(event) {

        if (event.target.classList.contains('url-class') || event.target.classList.contains('tag-class')) {

            if (event.target.classList.contains('url-class')) {
                this._toolTipTitle = 'Ctrl + click to follow link';
            } else {
                this._toolTipTitle = 'Click on tag to filter';
            }

            this.eventPos = event.target.getBoundingClientRect();

            if (!this.tooltip) {
                this.show();
            }
        } else {
            if (this.tooltip) {
                this.hide();
            }
        }
    }

    @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
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
            this.clearTimeouts();
            clearTimeout(this.hideTimeoutId);

            this.isHidePending = true;
            this.renderer.removeClass(this.tooltip, 'tooltip-show');
            this.hideTimeoutId = window.setTimeout(() => {
                this.renderer.removeChild(document.body, this.tooltip);
                this.tooltip = null;
                this.isHidePending = false;
            }, this._delay);
        }
    }

    create() {
        this.tooltip = this.renderer.createElement('span');

        this.renderer.appendChild(this.tooltip, this.renderer.createText(this._toolTipTitle));
        this.renderer.appendChild(document.body, this.tooltip);

        this.renderer.addClass(this.tooltip, 'tooltip');
        this.renderer.addClass(this.tooltip, `tooltip-${this._placement}`);

        // Setup delay
        this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this._delay}ms`);
        this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this._delay}ms`);
        this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this._delay}ms`);
        this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this._delay}ms`);
    }

    setPosition() {
        // Host size and destination info
        const hostPos = this.eventPos;

        // Tooltip size and destination info
        const tooltipPos = this.tooltip.getBoundingClientRect();

        // scroll top of window
        // The getBoundingClientRect method returns the relative position in the viewport.
        // If scrolling occurs, the top of the tooltip element should reflect the vertical scrolling coordinate value.
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let top, left;

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
