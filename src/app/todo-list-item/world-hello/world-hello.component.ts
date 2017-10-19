import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'app-world-hello',
    templateUrl: './world-hello.component.html',
    styleUrls: ['./world-hello.component.css']
})
export class WorldHelloComponent implements OnInit {

    showNum = '0';

    constructor(private _injector: Injector) {
        this.showNum = this._injector.get('showNum');
     }

    ngOnInit() {
    }

}
