import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class TodosResolver implements Resolve<Observable<ToDo[]>> {

    serviceState = 1;

    constructor(private _todoService: TodoService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ToDo[]> {
        if (this.serviceState === 1) {
            // TODO: Should we init base always, or in some cases?
            // Thank's to @thekiba (https://t.me/angular_ru/81332)
            return this._todoService.initIndexedDbBase().switchMap(() => this._todoService.getAllTodos(0));
        } else {
            return this._todoService.getAllTodos(0);
        }
    }

}
