import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Services
import { TagService } from '@app/_services/tag.service';

import 'rxjs/add/observable/of';

@Pipe({
    name: 'parseTagPipe'
})
export class ParseTagPipe implements PipeTransform {

    consoleTextColorPipe = 'color: purple;';

    // tslint:disable-next-line:max-line-length
    urlsRegExp = /(\b(https?|http|ftp|ftps|Https|rtsp|Rtsp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim; // Find/Replace URL's in text
    hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text

    constructor(private _tagService: TagService) { }

    transform(text: string): Observable<string> {
        return this.parseTag(text);
    }

    // parseTag(text: string): Observable<string> {
    //     // Find/Replace URL's in text
    //     if (text.match(this.urlsRegExp)) {
    //         text = text.replace(this.urlsRegExp, function replacer($1, $2, $3) {
    //             const url = $1;
    //             const urlClean = url.replace('' + $3 + '://', '');

    //             return `<a href='` + url + `' target='_blank'>` + urlClean + `</a>`;
    //         });
    //     }

    //     // Find/Replace #hashtags in text
    //     if (text.match(this.hashtagsRegExp)) {
    //         // text = text.replace(this.hashtagsRegExp, `$1<span class='tag-class'>$2</span>`);    // Old text without color

    //         // const color = '#efefef';
    //         // text = text.replace(this.hashtagsRegExp, `$1<span class='tag-class' style='background-color: ` + color + `;'>$2</span>`);
    //         const scope = this;

    //         text = text.replace(this.hashtagsRegExp, function replacer($1, $2, $3) {
    //             const space = $2;
    //             const tagName = $3;

    //             let colorInTagService = '';
    //             colorInTagService = scope._tagService.getTagColorByName(tagName);
    //             console.log(`%cin ParseTagPipe for %s colorInTagService is:`, scope.consoleTextColorPipe, tagName, colorInTagService);
    //             console.log(`%cin ParseTagPipe for %s tags is:`, scope.consoleTextColorPipe, tagName, scope._tagService.tags);

    //             return space + `<span class='tag-class' style='background-color: ` + colorInTagService + `;'>` + tagName + `</span>`;
    //         });
    //     }

    //     return Observable.of(text);
    // }

    parseTag(text: string): Observable<string> {

        // Find/Replace #hashtags in text
        if (text.match(this.hashtagsRegExp)) {

            // TODO: Stopped here, added method 'getTagColor()' in 'IndexedDbService', now test in the pipe
            // Currently the problem with 'newTodo' that pipe in view works faster, then todoList updates in service
            // Consider to use async pipe and or something else to solve the issue

            const colorInTagService = 'red';
            const tagName = '#someKindOf';
            text = `3. Todo with <span class='tag-class' style='background-color: ` + colorInTagService + `;'>` + tagName + `</span>`;
        }

        return Observable.of(text);
    }
}
