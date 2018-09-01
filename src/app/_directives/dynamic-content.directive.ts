import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appDynamicContentDirective]'
})
export class DynamicContentDirective {

    toolTipTitle = 'Ctrl + click to follow link';
    placement = 'top';
    delay = '500';
    tooltip: HTMLElement;
    // Distance between parent element and tooltip
    offset = 10;
    isHidePending = false;
    hideTimeout: number;
    eventPos: any;

    constructor(private elementRef: ElementRef, public router: Router, private renderer: Renderer2) { }

    @Input('appDynamicContentDirective') dynamicContent: string;

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
                this.toolTipTitle = 'Ctrl + click to follow link';
            } else {
                this.toolTipTitle = 'Click on tag to filter';
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
        const hostPos = this.eventPos;

        // Tooltip size and destination info
        const tooltipPos = this.tooltip.getBoundingClientRect();

        // scroll top of window
        // The getBoundingClientRect method returns the relative position in the viewport.
        // If scrolling occurs, the top of the tooltip element should reflect the vertical scrolling coordinate value.
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let top, left;

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

}
