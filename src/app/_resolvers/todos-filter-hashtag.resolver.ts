import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';

import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TodosFilterHashtagResolver implements Resolve<Observable<ToDo[]>> {

    constructor(private _todoService: TodoService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ToDo[]> {
        console.log(`%cin 'TodosFilterHashtagResolver' hashtag: `, 'color: royalblue;', route.params['hashtag']);
        // tslint:disable-next-line:max-line-length
        // return this._todoService.initIndexedDbBase().switchMap(() => this._todoService.getTodosWithHashtag(route.params['hashtag']));    // Open base anyway
        // return this._todoService.initIndexedDbBase().switchMap(() => this._todoService.getAllTodos(0));    // Open base anyway
        return this._todoService.initIndexedDbBase().pipe(
            switchMap(() => this._todoService.getAllTodos(0).pipe(
                map(todos => {
                    console.log(`%cin 'TodosFilterHashtagResolver' todos: `, 'color: royalblue;', todos);

                    return todos;
                })
            ))
        );    // Open base anyway
    }

}
