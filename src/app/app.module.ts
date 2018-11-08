import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from '@app/app.component';
import { TodosComponent } from '@app/todos/todos.component';
import { TodoTitleComponent } from '@app/todo-title/todo-title.component';
import { TodoListHeaderComponent } from '@app/todo-list-header/todo-list-header.component';
import { TodoListComponent } from '@app/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todo-list/todo-list-item/todo-list-item.component';
import { TodoListItemEditComponent } from '@app/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListFooterComponent } from '@app/todo-list-footer/todo-list-footer.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { DialogDeleteComponent } from '@app/dialog/dialog-delete/dialog-delete.component';
import { DialogMoreComponent } from '@app/dialog/dialog-more/dialog-more.component';
import { SignInComponent } from './sign-in/sign-in.component';

// Services
import { TodoService } from '@app/_services/todo.service';
import { ApiService } from '@app/_services/api.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TagService } from '@app/_services/tag.service';
import { TagLayerService } from '@app/_services/tag-layer.service';
import { SessionStorageService } from '@app/_services/session-storage.service';
import { AuthService } from '@app/_services/auth.service';
import { JwtService } from '@app/_services/jwt.service';

// Routings
import { AppRoutingModule } from '@app/app-routing.module';

// Directives
import { RouterLinkActiveStubsDirective } from '@app/_testing/router-stubs.directive';
import { DynamicContentDirective } from '@app/_directives/dynamic-content.directive';
import { TooltipDirective } from '@app/_directives/tooltip.directive';

// Pipes
import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';
import { SafePipe } from '@app/_pipes/safe.pipe';
import { FilterTagPipe } from '@app/_pipes/filter-tag.pipe';

// Modules
import { DndModule } from '@beyerleinf/ngx-dnd';
import { Autosize } from 'ng-autosize/src/autosize.directive';
// tslint:disable-next-line:max-line-length
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule } from '@angular/material';
import { Utils } from '@app/_common/utils';

// Guards
import { CanActivateTodosGuard } from '@app/_guards/can-activate-todos.guard';

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
        RouterLinkActiveStubsDirective,
        Autosize,
        TodoTitleComponent,
        DialogDeleteComponent,
        DialogMoreComponent,
        ParseTagPipe,
        DynamicContentDirective,
        SafePipe,
        FilterTagPipe,
        TooltipDirective,
        SignInComponent
    ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        DndModule.forRoot(),
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        ReactiveFormsModule
    ],
    providers: [
        TodoService,
        ApiService,
        IndexedDbService,
        TodoOrderService,
        TagService,
        Utils,
        TagLayerService,
        SessionStorageService,
        AuthService,
        CanActivateTodosGuard,
        JwtService
    ],
    bootstrap: [AppComponent],
    entryComponents: [DialogDeleteComponent, DialogMoreComponent]
})
export class AppModule { }
