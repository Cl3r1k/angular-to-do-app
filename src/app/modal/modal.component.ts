import { Component, OnInit, Input, Output, HostListener } from '@angular/core';
import { transition, state, trigger, style, animate } from '@angular/animations';
import { ModalService } from '@app/_services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    animations: [
        trigger('modal', [
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
export class ModalComponent implements OnInit {

    @Input() modalId: string;
    @Input() modalTitle: string;
    @Input() blocking = false;
    isOpen = false;

    // TODO: This part is not working
    @HostListener('keyup') onMouseEnter(event) {
        this.keyup(event);
    }

    @HostListener('mouseup') onmouseenter(event) {
        this.alertMouseEnter();
    }

    constructor(private _modalService: ModalService) { }

    ngOnInit() {
        this._modalService.registerModal(this);
    }

    close(checkBlocking = false) {
        this._modalService.close(this.modalId, checkBlocking);
    }

    private keyup(event: KeyboardEvent) {
        alert('keyuped');
        if (event.keyCode === 27) {
            this.close(true);
        }
    }

    private alertMouseEnter() {
        alert('Event fired');
    }

}
