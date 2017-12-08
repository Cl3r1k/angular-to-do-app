import { Directive, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[routerLinkActive]'
})
export class RouterLinkActiveStubsDirective {

    @Input() routerLinkActiveOptions: {exact: boolean} = {exact: false};

}
