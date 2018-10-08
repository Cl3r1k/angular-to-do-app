import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoService } from '@app/_services/todo.service';
import { ResolverData } from '@app/_models/resolver-data';

import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TodosActiveResolver implements Resolve<Observable<ResolverData>> {

    consoleTextColorResolver = 'color: royalblue;';

    constructor(private _todoService: TodoService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolverData> {
        console.log(`%cresolve() in TodosActiveResolver`, this.consoleTextColorResolver);

        return this._todoService.initIndexedDbBase().pipe(
            switchMap(() => this._todoService.getAllTodos(1).pipe(
                map(todos => {
                    // console.log(`%cin 'TodosResolver' todos: `, this.consoleTextColorResolver, todos);

                    const resolverData: ResolverData = new ResolverData(1, '');
                    resolverData.todos = todos;

                    // console.log(`%cin 'TodosResolver' resolverData: `, this.consoleTextColorResolver, resolverData);

                    return resolverData;
                })
            ))
        );    // Open base anyway
    }

}
