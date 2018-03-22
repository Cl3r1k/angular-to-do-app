import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoOrderService {

    constructor() { }

    updateOrder(todoOrderList: string[]): Observable<null> {
        console.log('%cin TodoOrderService current order: ', 'color: blue;', todoOrderList);
        return Observable.of(null);
    }

}
