import { Component, Injector, OnInit } from '@angular/core';

@Component({
    selector: 'app-hello-world',
    templateUrl: './hello-world.component.html',
    styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

    showNum = '0';

    constructor(private _injector: Injector) {
        this.showNum = this._injector.get('showNum');
    }

    ngOnInit() {
    }

}
