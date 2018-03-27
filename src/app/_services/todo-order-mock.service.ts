import { Injectable } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

@Injectable()
export class TodoOrderMockService {

    constructor() { }

    public updateOrder(): boolean {
        return true;
    }

    public getOrder(): string[] {
        return ['id1', 'id2', 'id3'];
    }

}
