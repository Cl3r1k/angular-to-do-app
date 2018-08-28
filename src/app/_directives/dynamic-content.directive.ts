import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appDynamicContentDirective]'
})
export class DynamicContentDirective {

    constructor(private elementRef: ElementRef, public router: Router) { }

    @Input('appDynamicContentDirective') dynamicContent: string;

    @HostListener('click', ['$event']) onclick(e) {

        console.log('event.target: ', event.target);

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

    @HostListener('mouseenter', ['$event']) onMouseEnter(event) {
        // if (!this.tooltip) {
        //     this.show();
        // }

        console.log('event.target onMouseEnter: ', event.target);

        if (event.target.classList.contains('url-class')) {
            console.log('hovered URL');
        }
    }

    @HostListener('mouseover', ['$event']) onMouseOver(event) {
        // if (!this.tooltip) {
        //     this.show();
        // }

        console.log('event.target onMouseOver: ', event.target);

        if (event.target.classList.contains('url-class')) {
            console.log('hovered URL');
        }
    }

    @HostListener('mouseleave') onMouseLeave(e) {
        // if (this.tooltip) {
        //     this.hide();
        // }
    }

}
