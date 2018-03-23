import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoOrderService {

    constructor() { }

    updateOrder(todoOrderList: string[]): Observable<null> {

        let data: Object;

        const update_time = new Date().toISOString();
        console.log('%cin TodoOrderService current order: ', 'color: blue;', todoOrderList);

        data = {
            update_time: update_time,
            order: todoOrderList
        };

        localStorage.setItem('_orderList', JSON.stringify(data));
        return Observable.of(null);
    }

    getOrder() {
        const data = localStorage.getItem('_orderList');

        const todoOrderList: string[] = data['order'];

        console.log('%cin TodoOrderService in getOrder() order: ', 'color: blue;', todoOrderList);
    }

}
