export class ToDo {

    id: number;
    title = '';
    complete = false;
    inner_id: string;
    created_time: Date;
    updated_time: Date;
    completed_time: Date;
    deleted_time: Date;
    pin = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.created_time = new Date();
    }

}
