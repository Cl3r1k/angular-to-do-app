import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomComponent } from '../custom-component';

@Component({
    selector: 'app-details',
    template: `
        <h3>List items</h3>
        <ul>
            <li *ngFor='let item of data'>{{item.detail}}</li>
        </ul>
        <hr>
    `
})
export class DetailsComponent implements OnInit, CustomComponent {

    @Input() data: any;

    @Output() updateEmitter: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        setTimeout(() => this.update(), 1000);
    }

    update(): void {
        this.updateEmitter.emit(10);
    }

}
