import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomComponent } from './../custom-component';

@Component({
    selector: 'app-table',
    template: `
        <h3>Table items</h3>
        <table border=1>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
            <tr *ngFor='let item of data'>
                <td>{{item.name}}</td>
                <td>{{item.description}}</td>
            </tr>
        </table>
        <hr>
    `
})
export class TableComponent implements OnInit, CustomComponent {

    @Input() data: any;

    @Output() updateEmitter: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        setTimeout(() => this.update(), 2000);
    }

    update(): void {
        this.updateEmitter.emit(3);
    }

}
