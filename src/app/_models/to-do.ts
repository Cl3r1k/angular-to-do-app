export class ToDo {

    id: number;
    title = '';
    complete = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
