import { Injectable } from '@angular/core';

// Models
import { Tag } from '@app/_models/tag';

// Modules
import { Utils } from '@app/_common/utils';

@Injectable()
export class TagService {

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
    interval;
    updatePending = false;

    constructor(private _utils: Utils) { }

    public setTagsList(tags: Tag[]) {
        console.log('%c setTagsList - incoming tags: ', this.consoleTextColorService, tags);
        this.tags = tags;
    }

    public getTagColorByName(tagName: string): string {
        console.log('%c getTagByName - incoming tagName: ', this.consoleTextColorService, tagName);
        let tagColor = 'red';
        const tags = this.tags.filter(tag => {
            return tag.tagName === tagName;
        });

        if (tags.length) {
            tagColor = tags[0].color;
        } else {
            // Add new hashtag to list and run ServiceWorker
            const newHashtag: Tag = new Tag(tagName.trim());
            tagColor = this.colorsHashtags[this._utils.randomRangeInteger(0, 9)];
            newHashtag.color = tagColor;
            // console.log(`%cin 'getTagColorByName' tagColor: `, this.consoleTextColorService, tagColor);
            this.tags.push(newHashtag);

            console.log('%cPending update in %cIndexedDb!', this.consoleTextColorService, 'color: red;');
            // TODO: Now we should run Sevice Worker or another worker with interval 3 sec, and update tagList in IndexedDb
            // BTW check if SW is running and waiting for update already, than just reset timer to 3 sec
            this.updateHashtags();
        }

        return tagColor;    // If something went wrong, return tagColor as red
    }

    public updateHashtags() {
        if (this.updatePending) {
            clearInterval(this.interval);
        }

        this.updatePending = true;
        this.interval = setInterval(() => {
            console.log('%c-->Pefrorm update in %cIndexedDb!', this.consoleTextColorService, 'color: red;');
            clearInterval(this.interval);
        }, 1000);
    }

}
