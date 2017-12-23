import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';

@Injectable()
export class TodosResolver implements Resolve<Observable<ToDo[]>> {

    serviceState = 0;

    constructor(private _todoService: TodoService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ToDo[]> {
        if (this.serviceState === 1) {
            this._todoService.initIndexedDbBase().subscribe((_) => {
                console.log('incoming data: ', _);
                // return this._todoService.getAllTodos(0);
            });    // TODO: Should we init base always, or in some cases?
        } else {
            return this._todoService.getAllTodos(0);
        }
    }

}
