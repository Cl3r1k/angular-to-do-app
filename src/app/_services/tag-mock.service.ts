import { Injectable } from '@angular/core';

// Models
import { Tag } from '@app/_models/tag';

@Injectable()
export class TagMockService {

    constructor() { }

    public getTagColorByName(tagName: string): string {
        return 'red';
    }

    public updateHashtagsDelayed() {
        // Original method executes after 100ms
    }

}
