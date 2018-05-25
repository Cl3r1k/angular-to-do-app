import { ToDo } from '@app/_models/to-do';

export class ResolverData {
    todos: ToDo[] = [];
    activeRouteState: number;
    hashTagToFilter = '';

    constructor(activeRouteState: number, hashTagToFilter: string) {
        this.activeRouteState = activeRouteState;
        this.hashTagToFilter = hashTagToFilter;
    }
}
