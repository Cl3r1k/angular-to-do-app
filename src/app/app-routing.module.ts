import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { TodosComponent } from '@app/todos/todos.component';
import { TodosResolver } from '@app/todos.resolver';

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
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [TodosResolver]
})
export class AppRoutingModule { }
