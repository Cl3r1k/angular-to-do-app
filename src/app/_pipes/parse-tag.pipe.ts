import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parseTagPipe'
})
export class ParseTagPipe implements PipeTransform {

    // tslint:disable-next-line:max-line-length
    urls = /(\b(https?|http|ftp|ftps|Https|rtsp|Rtsp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim; // Find/Replace URL's in text
    hashtags = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text

    transform(text: string): string {
        this.parseTag(text);
        // return text;
        return this.parseTag(text);
    }

    parseTag(text: string) {
        // Find/Replace URL's in text
        if (text.match(this.urls)) {
            text = text.replace(this.urls, function replacer($1, $2, $3) {
                const url = $1;
                const urlClean = url.replace('' + $3 + '://', '');

                return `<a href='` + url + `' target='_blank'>` + urlClean + `</a>`;
            });
        }

        // Find/Replace #hashtags in text
        if (text.match(this.hashtags)) {
            text = text.replace(this.hashtags, `$1<span class='tag-class'>$2</span>`);
        }

        return text;
    }
}
