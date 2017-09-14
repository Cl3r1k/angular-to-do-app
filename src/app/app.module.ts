import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoAppComponent } from './todo-app/todo-app.component';

// Services
import { TodoService } from './todo.service';

@NgModule({
    declarations: [
        AppComponent,
        TodoAppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [TodoService],
    bootstrap: [AppComponent]
})
export class AppModule { }
