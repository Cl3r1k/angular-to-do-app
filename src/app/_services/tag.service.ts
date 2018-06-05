import { Injectable } from '@angular/core';

// Models
import { Tag } from '@app/_models/tag';

import { Observable } from 'rxjs/Observable';

// Services
// import { IndexedDbService } from '@app/_services/indexed-db.service';

@Injectable()
export class TagService {

    consoleTextColorService = 'color: salmon;';

    tags: Tag[] = [];

    constructor(/* private _indexedDbService: IndexedDbService */) { }

    // public getTagColor(tagName: string): Observable<string> {
    //     return this._indexedDbService.getTagColor(tagName);
    // }

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

        if (tags) {
            tagColor = tags[0].color;
        }

        return tagColor;    // If something went wrong, red tagColor as red
    }

}
