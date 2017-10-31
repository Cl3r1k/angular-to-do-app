import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListItemEditComponent } from './todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListItemViewComponent } from './todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Services
import { TodoService } from './services/todo.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

// Routings
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        TodoListHeaderComponent,
        TodoListComponent,
        TodoListItemComponent,
        TodoListFooterComponent,
        TodosComponent,
        PageNotFoundComponent,
        TodoListItemViewComponent,
        TodoListItemEditComponent
    ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        FormsModule
    ],
    providers: [TodoService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
