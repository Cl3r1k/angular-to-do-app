import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogDeleteComponent } from '@app/dialog/dialog-delete/dialog-delete.component';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRefMock } from '@app/_testing/mat-dialog-mock';

describe('Component: DialogDeleteComponent', () => {
    let component: DialogDeleteComponent;
    let fixture: ComponentFixture<DialogDeleteComponent>;
    let dialogConfirmBtnEl;

    // Mock MAT_DIALOG_DATA with the Object
    const dataForDialog = {
        dialogTitle: 'Delete Todos',
        contentTitle: 'Are you sure want to delete todos amount: ',
        contentData: 5,
        isClearCompleted: true
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogDeleteComponent],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: {
                    data: {
                        data: dataForDialog
                    }
                } }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogDeleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dialogConfirmBtnEl = fixture.debugElement.query(By.css('.dialog__confirm-btn'));       // Find confirm button element

        fixture.detectChanges();
    });

    it(`should create an instance of 'DialogDeleteComponent' (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    describe(`#view tests`, () => {
        it(`clicking on button.dialog__confirm-btn should call method 'onConfirm()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'onConfirm');
            if (dialogConfirmBtnEl instanceof HTMLElement) {
                dialogConfirmBtnEl.click();
            } else {
                dialogConfirmBtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.onConfirm).toHaveBeenCalled();
            });
        });

        // it(`clicking on div.modal-overlay (outside of the modal) should call method 'close()' (async)`, async () => {
        //     // Arrange

        //     // Act
        //     spyOn(component.dialogRef, 'close').and.callThrough();

        //     // spyOn(component.dialogRef, 'close');
        //     if (dialogConfirmBtnEl instanceof HTMLElement) {
        //         dialogConfirmBtnEl.click();
        //     } else {
        //         dialogConfirmBtnEl.triggerEventHandler('click', { button: 0 });
        //     }

        //     // Assert
        //     fixture.whenStable().then(() => {
        //         expect(component.dialogRef.close).toHaveBeenCalled();
        //     });
        // });

        // it(`clicking on div.modal-overlay (outside of the modal) should call method 'close()' (async)`, async () => {
        //     // Arrange

        //     // Act
        //     spyOn(component, 'close');
        //     modalOverlayEl.click();

        //     // Assert
        //     fixture.whenStable().then(() => {
        //         expect(component.close).toHaveBeenCalled();
        //     });
        // });

        // it(`pressing 'Esc' should call method 'close()' (async)`, async () => {
        //     // Arrange
        //     component.isOpen = true;
        //     const keyUpEscapeEvent = new KeyboardEvent('keyup', {
        //         'key': 'Escape'
        //     });
        //     Object.defineProperty(keyUpEscapeEvent, 'keyCode', { 'value': 27 });

        //     // Act
        //     spyOn(component, 'close');

        //     // Call Escape event on document
        //     document.dispatchEvent(keyUpEscapeEvent);
        //     fixture.detectChanges();

        //     // Assert
        //     fixture.whenStable().then(() => {
        //         expect(component.close).toHaveBeenCalled();
        //     });
        // });
    });
});

