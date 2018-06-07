export class Tag {

    id: number;
    tagName: string;
    created_time: string;
    updated_time: string;
    color: string;
    readyToDelete = false;

    constructor(tagName) {
        this.tagName = tagName;
        this.created_time = new Date().toISOString();
        this.updated_time = null;
        this.color = 'red';
    }
}
