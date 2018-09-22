import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { TodosComponent } from '@app/todos/todos.component';
import { TodosResolver } from '@app/_resolvers/todos.resolver';
import { TodosActiveResolver } from '@app/_resolvers/todos-active.resolver';
import { TodosCompletedResolver } from '@app/_resolvers/todos-completed.resolver';
import { TodosFilterHashtagResolver } from '@app/_resolvers/todos-filter-hashtag.resolver';
import { SignInComponent } from '@app/sign-in/sign-in.component';

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
        resolve: {
            resolverData: TodosResolver
        }
    },
    {
        path: 'todos/active',
        component: TodosComponent,
        resolve: {
            resolverData: TodosActiveResolver
        }
    },
    {
        path: 'todos/completed',
        component: TodosComponent,
        resolve: {
            resolverData: TodosCompletedResolver
        }
    },
    {
        path: 'todos/filter/hashtag/:hashtag',
        component: TodosComponent,
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
