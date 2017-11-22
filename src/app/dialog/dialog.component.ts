import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { transition, state, trigger, style, animate } from '@angular/animations';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    animations: [
        trigger('dialog', [
            state('void', style({
                opacity: 0
            })),
            state('*', style({
                opacity: 1
            })),
            transition('void => *', animate('300ms ease-in')),
            transition('* => void', animate('300ms ease-out'))
        ]),
        trigger('overlay', [
            state('void', style({
                opacity: 0
            })),
            state('*', style({
                opacity: 1
            })),
            transition('void => *', animate('300ms ease-in')),
            transition('* => void', animate('300ms ease-out'))
        ]),
    ]
})
export class DialogComponent implements OnInit {

    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

}
