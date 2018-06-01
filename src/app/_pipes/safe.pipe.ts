import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeHtml, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safePipe'
})
export class SafePipe implements PipeTransform {

    consoleTextColorPipe = 'color: purple;';

    constructor(private sanitizer: DomSanitizer) { }

    transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html': {
                // console.log(`%bypassSecurityTrustHtml: `, this.consoleTextColorPipe, this.sanitizer.bypassSecurityTrustHtml(value));
                return this.sanitizer.bypassSecurityTrustHtml(value);
            }
            case 'style': {
                // console.log(`%cbypassSecurityTrustStyle: `, this.consoleTextColorPipe, this.sanitizer.bypassSecurityTrustStyle(value));
                return this.sanitizer.bypassSecurityTrustStyle(value);
            }
            case 'script': {
                return this.sanitizer.bypassSecurityTrustScript(value);
            }
            case 'url': {
                return this.sanitizer.bypassSecurityTrustUrl(value);
            }
            case 'resourceUrl': {
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            }
            default: {
                throw new Error(`Invalid safe type specified: ${type}`);
            }
        }
    }

}
