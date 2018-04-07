import { v4 as uuidv4 } from 'uuid';

export class ToDo {

    id: number;
    title = '';
    complete = false;
    inner_id: string;
    created_time: string;
    updated_time: string;
    completed_time: string;
    deleted_time: string;
    pin = false;
    costedPomo = 0;
    estimatedPomos = 0;
    remindMe = false;
    remindTime = null;
    note = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.created_time = new Date().toISOString();
        this.completed_time = null;
        this.updated_time = null;
        this.deleted_time = null;
        this.inner_id = uuidv4();    // Generate new UUID
    }

}
