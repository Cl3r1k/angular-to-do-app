import { Injectable } from '@angular/core';

// Models
import { Tag } from '@app/_models/tag';

@Injectable()
export class TagLayerService {

    consoleTextColorService = 'color: salmon;';

    tags: Tag[] = [];
    colorsHashtags: string[] = [
        '#00ced1',
        '#217273',
        '#bb3c3c',
        '#b32279',
        '#45c143',
        '#135012',
        '#c1692a',
        '#966441',
        '#797979',
        '#b97aff',
    ];

    constructor() { }

    public setTagsList(tags: Tag[]) {
        console.log('%c setTagsList - incoming tags: ', this.consoleTextColorService, tags);
        this.tags = tags;
    }

}
