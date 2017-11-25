import { Component, OnInit, Input, Output, HostListener } from '@angular/core';
import { ModalService } from '@app/_services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    @Input() modalId: string;
    @Input() modalTitle: string;
    @Input() blocking = false;
    isOpen = false;

    @HostListener('keyup') onmouseenter(event) {
        this.keyup(event);
    }

    constructor(private _modalService: ModalService) { }

    ngOnInit() {
        this._modalService.registerModal(this);
    }

    close(checkBlocking = false) {
        this._modalService.close(this.modalId, checkBlocking);
    }

    private keyup(event: KeyboardEvent) {
        if (event.keyCode === 27) {
            this.close(true);
        }
    }

}
