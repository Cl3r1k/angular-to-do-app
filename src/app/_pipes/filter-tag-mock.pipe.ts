
export class FilterTagMockPipe {

    constructor() { }

    public transform(text: string): string {
        return this.filterTag(text);
    }

    filterTag(text: string): string {

        const colorInTagService = 'gray';
        return `<div class='hashtag' style='background-color: ` + colorInTagService + `;'>` + text + `</div>`;
    }

}
