import { Injectable } from '@angular/core';
import { ModalComponent } from '@app/modal/modal.component';

@Injectable()
export class ModalService {

    private modals: Array<ModalComponent>;

    constructor() {
        this.modals = [];
    }

    registerModal(newModal: ModalComponent) {
        const modal = this.findModal(newModal.modalId);

        // Delete existing to replace the modal
        if (modal) {
            this.modals.splice(this.modals.indexOf(modal));
        }

        this.modals.push(newModal);
    }

    open(modalId: string) {
        const modal = this.findModal(modalId);

        if (modal) {
            modal.isOpen = true;
        }
    }

    close(modalId: string, chechBlocking = false) {
        const modal = this.findModal(modalId);

        if (modal) {
            if (chechBlocking && modal.blocking) {
                return;
            }

            modal.isOpen = false;
        }
    }

    private findModal(modalId: string): ModalComponent {
        for (const modal of this.modals) {
            if (modal.modalId === modalId) {
                return modal;
            }
        }

        return null;
    }

}
