import { Injectable } from '@angular/core';

@Injectable()
export class TodoOrderService {

    constructor() { }

    updateOrder(todoOrderList: string[]): boolean {

        let data: Object;

        const update_time = new Date().toISOString();
        console.log('%cin TodoOrderService in updateOrder() order to save: ', 'color: orange;', todoOrderList);

        data = {
            update_time: update_time,
            order: todoOrderList,
            __dirty: true
        };

        localStorage.setItem('_orderList', JSON.stringify(data));

        return true;
    }

    getOrder(): string[] {

        const data = JSON.parse(localStorage.getItem('_orderList'));

        let todoOrderList: string[] = null;
        if (data) {
            todoOrderList = data['order'];
        }

        console.log('%cin TodoOrderService in getOrder() order: ', 'color: orange;', todoOrderList);

        return todoOrderList;
    }

}
