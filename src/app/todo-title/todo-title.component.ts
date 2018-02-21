import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment.prod';

@Component({
    selector: 'app-todo-title',
    templateUrl: './todo-title.component.html',
    styleUrls: ['./todo-title.component.scss']
})
export class TodoTitleComponent implements OnInit {

    BUILD_VERSION = environment.version;

    constructor() { }

    ngOnInit() {
    }

}
