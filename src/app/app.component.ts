// C:\Windows\System32\cmd.exe /k "C:\Program Files\nodejs\nodevars.bat" // To start from VSC terminal node env

// To push changes on githubpages
// ng build --prod --base-href "https://Cl3r1k.github.io/angular-to-do-app/"
// angular-cli-ghpages --repo=https://github.com/Cl3r1k/angular-to-do-app.git --name=Cl3r1k --email=cl3r1k2@gmail.com --no-silent

// TODO: - При редактировании использовать след. анимацию - затемнять фон, и приближать текущую задачу

import { Component } from '@angular/core';
import { TodoAppComponent } from './todo-app/todo-app.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent { }
