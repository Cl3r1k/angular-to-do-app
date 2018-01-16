import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';

@Injectable()
export class TodosActiveResolver implements Resolve<Observable<ToDo[]>> {

    constructor(private _todoService: TodoService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ToDo[]> {
        return this._todoService.initIndexedDbBase().switchMap(() => this._todoService.getAllTodos(1));    // Open base anyway
    }

}
