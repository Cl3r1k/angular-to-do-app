
export class ParseTagMockPipe {

    urlsRegExp = /(\b(https?|http|ftp|ftps|Https|rtsp|Rtsp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
    hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text

    constructor() { }

    public transform(text: string): string {
        return this.parseTag(text);
    }

    parseTag(text: string): string {
        if (text.match(this.urlsRegExp)) {
            text = text.replace(this.urlsRegExp, function replacer($1, $2, $3) {
                const url = $1;
                const urlClean = url.replace('' + $3 + '://', '');

                return `<a href='` + url + `' target='_blank'>` + urlClean + `</a>`;
            });
        }

        if (text.match(this.hashtagsRegExp)) {
            text = text.replace(this.hashtagsRegExp, function replacer($1, $2, $3) {
                const space = $2;
                const tagName = $3;

                const colorInTagService = 'red';

                return space + `<span class='tag-class' style='background-color: ` + colorInTagService + `;'>` + tagName + `</span>`;
            });
        }

        return text;
    }

}
