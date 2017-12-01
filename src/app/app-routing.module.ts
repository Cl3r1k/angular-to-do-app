import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { TodosComponent } from '@app/todos/todos.component';
import { TodosResolver } from '@app/_resolvers/todos.resolver';
import { TodosActiveResolver } from '@app/_resolvers/todos-active.resolver';
import { TodosCompletedResolver } from '@app/_resolvers/todos-completed.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
    },
    {
        path: 'todos',
        component: TodosComponent,
        resolve: {
            todos: TodosResolver
        }
    },
    {
        path: 'todos/active',
        component: TodosComponent,
        resolve: {
            todos: TodosActiveResolver
        }
    },
    {
        path: 'todos/completed',
        component: TodosComponent,
        resolve: {
            todos: TodosCompletedResolver
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
    providers: [TodosResolver, TodosActiveResolver, TodosCompletedResolver]
})
export class AppRoutingModule { }
