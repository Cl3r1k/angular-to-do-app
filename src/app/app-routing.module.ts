import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
    },
    {
        path: 'todos',
        component: TodosComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
