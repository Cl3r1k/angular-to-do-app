import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-world',
    templateUrl: './world.component.html',
    styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

    @Input() todoTitle: string;

    constructor() { }

    ngOnInit() {
    }

}
