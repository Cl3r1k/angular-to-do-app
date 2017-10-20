import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'app-world-hello',
    templateUrl: './world-hello.component.html',
    styleUrls: ['./world-hello.component.css']
})
export class WorldHelloComponent implements OnInit {

    transferedData = '0';

    constructor(private _injector: Injector) {
        this.transferedData = this._injector.get('transferedData');
     }

    ngOnInit() {
    }

}
