import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';

// Services
import { TodoService } from './todo.service';
import { ApiService } from './api.service';
import { HttpModule } from '@angular/http';

// Routings
import { AppRoutingModule } from './app-routing.module';
import { TodosComponent } from './todos/todos.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoListHeaderComponent,
        TodoListComponent,
        TodoListItemComponent,
        TodoListFooterComponent,
        TodosComponent
    ],
    imports: [
        AppRoutingModule,
        HttpModule,
        BrowserModule,
        FormsModule
    ],
    providers: [TodoService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
