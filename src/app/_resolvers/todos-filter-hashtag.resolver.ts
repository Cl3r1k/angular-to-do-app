import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '@app/_services/todo.service';
import { ToDo } from '@app/_models/to-do';
import { ResolverData } from '@app/_models/resolver-data';

import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TodosFilterHashtagResolver implements Resolve<Observable<ResolverData>> {

    consoleTextColorResolver = 'color: royalblue;';

    constructor(private _todoService: TodoService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolverData> {
        // console.log(`%cin 'TodosFilterHashtagResolver' hashtag: `, this.consoleTextColorResolver, route.params['hashtag']);

        return this._todoService.initIndexedDbBase().pipe(
            switchMap(() => this._todoService.getAllTodos(0).pipe(
                map(todos => {
                    // console.log(`%cin 'TodosFilterHashtagResolver' todos: `, this.consoleTextColorResolver, todos);

                    const resolverData: ResolverData = new ResolverData(3, route.params['hashtag']);
                    resolverData.todos = todos;

                    // console.log(`%cin 'TodosFilterHashtagResolver' resolverData: `, this.consoleTextColorResolver, resolverData);

                    return resolverData;
                })
            ))
        );    // Open base anyway
    }

}
