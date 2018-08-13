import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appDynamicContentDirective]'
})
export class DynamicContentDirective {

    constructor(private elementRef: ElementRef, public router: Router) { }

    @Input('appDynamicContentDirective') dynamicContent: string;

    @HostListener('click', ['$event']) onclick(e) {
        if (e.target.classList.contains('tag-class')) {
            const link: string = e.target.innerHTML;

            event.preventDefault();
            event.stopPropagation();

            this.router.navigate(['/todos/filter/hashtag/', link.trim()], { skipLocationChange: true });
        }
    }

}
