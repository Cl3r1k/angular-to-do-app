import { Injectable } from '@angular/core';

import { AngularIndexedDB } from 'angular2-indexeddb';

@Injectable()
export class IndexedDbService {

    constructor() { }

    // API: (delete completed todos)
    public clearCompleted(activeRouteState: number) {
        console.log('This part is under construction');

        // Testing IndexedDb
        this.operateIndexedDb();

    }

    operateIndexedDb() {
        const db = new AngularIndexedDB('todoDb', 1);

        // db.openDatabase(1, (evt) => {
        //     let objectStore = evt.currentTarget.result.createObjectStore(
        //         'people', { keyPath: 'id', autoIncrement: true }
        //     );

        //     objectStore.createIndex('name', 'name', { unique: false });
        //     objectStore.createIndex('email', 'email', { unique: false });

        //     console.log('db created?');
        // });
    }

}
