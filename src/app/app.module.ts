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
import { TodoService } from './services/todo.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

// Routings
import { AppRoutingModule } from './app-routing.module';
import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoListItemEditComponent } from './todo-list-item-edit/todo-list-item-edit.component';
import { HelloWorldComponent } from './todo-list-item-edit/hello-world/hello-world.component';
import { WorldHelloComponent } from './todo-list-item-edit/world-hello/world-hello.component';
import { DynamicComponent } from './todo-list-item-edit/dynamic/dynamic.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoListHeaderComponent,
        TodoListComponent,
        TodoListItemComponent,
        TodoListFooterComponent,
        TodosComponent,
        PageNotFoundComponent,
        TodoListItemEditComponent,
        HelloWorldComponent,
        WorldHelloComponent,
        DynamicComponent
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
