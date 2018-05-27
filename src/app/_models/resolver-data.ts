import { ToDo } from '@app/_models/to-do';

export class ResolverData {
    todos: ToDo[] = [];
    activeRouteState: number;
    params = '';

    constructor(activeRouteState: number, params: string) {
        this.activeRouteState = activeRouteState;
        this.params = params;
    }
}
