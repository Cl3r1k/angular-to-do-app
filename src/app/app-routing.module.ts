import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Resolvers
import { TodosResolver } from '@app/_resolvers/todos.resolver';
import { TodosActiveResolver } from '@app/_resolvers/todos-active.resolver';
import { TodosCompletedResolver } from '@app/_resolvers/todos-completed.resolver';
import { TodosFilterHashtagResolver } from '@app/_resolvers/todos-filter-hashtag.resolver';

// Components
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { TodosComponent } from '@app/todos/todos.component';
import { SignInComponent } from '@app/sign-in/sign-in.component';

// Guards
import { CanActivateTodosGuard } from '@app/_guards/can-activate-todos.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'todos',
        component: TodosComponent,
        canActivate: [
            CanActivateTodosGuard
        ],
        resolve: {
            resolverData: TodosResolver
        }
    },
    {
        path: 'todos/active',
        component: TodosComponent,
        canActivate: [
            CanActivateTodosGuard
        ],
        resolve: {
            resolverData: TodosActiveResolver
        }
    },
    {
        path: 'todos/completed',
        component: TodosComponent,
        canActivate: [
            CanActivateTodosGuard
        ],
        resolve: {
            resolverData: TodosCompletedResolver
        }
    },
    {
        path: 'todos/filter/hashtag/:hashtag',
        component: TodosComponent,
        canActivate: [
            CanActivateTodosGuard
        ],
        resolve: {
            resolverData: TodosFilterHashtagResolver
        }
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [TodosResolver, TodosActiveResolver, TodosCompletedResolver, TodosFilterHashtagResolver]
})
export class AppRoutingModule { }
