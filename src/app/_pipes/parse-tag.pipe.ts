import { Pipe, PipeTransform } from '@angular/core';

// Services
import { TagService } from '@app/_services/tag.service';

@Pipe({
    name: 'parseTagPipe'
})
export class ParseTagPipe implements PipeTransform {

    consoleTextColorPipe = 'color: purple;';

    // tslint:disable-next-line:max-line-length
    urlsRegExp = /(\b(https?|http|ftp|ftps|Https|rtsp|Rtsp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim; // Find/Replace URL's in text
    hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text

    constructor(private _tagService: TagService) { }

    transform(text: string): string {
        // this.parseTag(text);
        // return text;
        return this.parseTag(text);
    }

    parseTag(text: string): string {
        // Find/Replace URL's in text
        if (text.match(this.urlsRegExp)) {
            text = text.replace(this.urlsRegExp, function replacer($1, $2, $3) {
                const url = $1;
                const urlClean = url.replace('' + $3 + '://', '');

                return `<a href='` + url + `' target='_blank'>` + urlClean + `</a>`;
            });
        }

        // Find/Replace #hashtags in text
        if (text.match(this.hashtagsRegExp)) {
            // text = text.replace(this.hashtagsRegExp, `$1<span class='tag-class'>$2</span>`);    // Old text without color

            // const color = '#efefef';
            // text = text.replace(this.hashtagsRegExp, `$1<span class='tag-class' style='background-color: ` + color + `;'>$2</span>`);
            const scope = this;

            text = text.replace(this.hashtagsRegExp, function replacer($1, $2, $3) {
                const space = $2;
                const tagName = $3;

                // let colorInDb = '';
                // const subscription = scope._tagService.getTagColor(tagName).subscribe((result) => {
                //     console.log(`%cin ParseTagPipe for %s result is:`, scope.consoleTextColorPipe, tagName, result);
                //     colorInDb = result;
                // });

                // console.log(`%cin ParseTagPipe for %s colorInDb is:`, scope.consoleTextColorPipe, tagName, colorInDb);

                // TODO: Find the way to handle observable (replacer should return a string)
                // Still in search of the solution

                const color = 'aqua';
                return space + `<span class='tag-class' style='background-color: ` + color + `;'>` + tagName + `</span>`;
            });
        }

        return text;
    }
}
