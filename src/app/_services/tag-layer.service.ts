import { Injectable } from '@angular/core';

// Models
import { Tag } from '@app/_models/tag';

@Injectable()
export class TagLayerService {

    consoleTextColorService = 'color: salmon;';

    tags: Tag[] = [];
    colorsHashtags: string[] = [
        '#1eafb1cc',
        '#217273b0',
        '#bb3c3ccc',
        '#b32279b0',
        '#45c143cc',
        '#135012b0',
        '#c1692acc',
        '#966441cc',
        '#797979cc',
        '#b97affcc',
    ];

    constructor() { }

    public setTagsList(tags: Tag[]) {
        console.log('%c setTagsList - incoming tags: ', this.consoleTextColorService, tags);
        this.tags = tags;
    }

}
