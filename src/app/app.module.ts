import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from '@app/app.component';
import { TodosComponent } from '@app/todos/todos.component';
import { TodoListHeaderComponent } from '@app/todo-list-header/todo-list-header.component';
import { TodoListComponent } from '@app/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todo-list-item/todo-list-item.component';
import { TodoListItemEditComponent } from '@app/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListItemViewComponent } from '@app/todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListFooterComponent } from '@app/todo-list-footer/todo-list-footer.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { ModalComponent } from '@app/modal/modal.component';

// Services
import { TodoService } from '@app/_services/todo.service';
import { ApiService } from '@app/_services/api.service';
import { ModalService } from '@app/_services/modal.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';                    // TODO: ----> Consider to use one of them
import { IndexedDbDexieService } from '@app/_services/indexed-db-dexie.service';         // -----|

// Routings
import { AppRoutingModule } from '@app/app-routing.module';

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
        TodoListItemEditComponent,
        ModalComponent
    ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule
    ],
    providers: [TodoService, ApiService, ModalService, IndexedDbService, IndexedDbDexieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
