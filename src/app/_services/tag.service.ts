import { Injectable } from '@angular/core';

// Models
import { Tag } from '@app/_models/tag';

// Services
import { IndexedDbService } from '@app/_services/indexed-db.service';

@Injectable()
export class TagService {

    constructor(private __indexedDbService: IndexedDbService) { }

    getColor() {
        //
    }

}
