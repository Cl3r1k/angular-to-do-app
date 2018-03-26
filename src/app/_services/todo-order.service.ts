import { Injectable } from '@angular/core';

@Injectable()
export class TodoOrderService {

    constructor() { }

    updateOrder(todoOrderList: string[]): boolean {

        let data: Object;

        const update_time = new Date().toISOString();
        console.log('%cin TodoOrderService current order: ', 'color: blue;', todoOrderList);

        data = {
            update_time: update_time,
            order: todoOrderList
        };

        localStorage.setItem('_orderList', JSON.stringify(data));

        return true;
    }

    getOrder(): string[] {
        const data = JSON.parse(localStorage.getItem('_orderList'));

        const todoOrderList: string[] = data['order'];

        console.log('%cin TodoOrderService in getOrder() order: ', 'color: blue;', todoOrderList);

        return todoOrderList;
    }

}
