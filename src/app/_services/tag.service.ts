import { Injectable } from '@angular/core';

// Models
import { Tag } from '@app/_models/tag';

import { Observable } from 'rxjs/Observable';

// Services
import { IndexedDbService } from '@app/_services/indexed-db.service';

@Injectable()
export class TagService {

    constructor(private _indexedDbService: IndexedDbService) { }

    public getTagColor(tagName: string): Observable<string> {
        return this._indexedDbService.getTagColor(tagName);
    }

}
