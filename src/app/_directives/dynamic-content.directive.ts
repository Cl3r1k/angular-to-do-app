import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appDynamicContentDirective]'
})
export class DynamicContentDirective {

    constructor(private elementRef: ElementRef, private router: Router) { }

    @Input('dynamicContent') dynamicContent: string;

    @HostListener('click', ['$event']) onclick(e) {
        if (e.target.classList.contains('tag-class')) {
            const link: string = e.target.innerHTML;

            event.preventDefault();
            event.stopPropagation();

            alert('filter todos with hashtag: ' + link.trim());
            this.router.navigateByUrl('/todos/filter/hashtag/' + link.trim(), { skipLocationChange: false });
        }
    }

}
