import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogMoreComponent } from '@app/dialog/dialog-more/dialog-more.component';

// tslint:disable-next-line:max-line-length
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatCheckboxModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatDialogRefMock } from '@app/_testing/mat-dialog-mock';

describe('Component: DialogMoreComponent', () => {
    let component: DialogMoreComponent;
    let fixture: ComponentFixture<DialogMoreComponent>;
    let dialogCloseBtnEl;
    let dialogConfirmDeleteBtnEl;
    let dialogConfirmSaveBtnEl;

    // Mock MAT_DIALOG_DATA with the Object
    const dataForDialog = {
        dialogTitle: 'Delete Todos',
        contentTitle: 'Are you sure want to delete todos amount: ',
        contentData: 5,
        isClearCompleted: true
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogMoreComponent],
            imports: [
                FormsModule,
                BrowserAnimationsModule,
                MatInputModule,
                MatCheckboxModule,
                MatFormFieldModule,
                MatDatepickerModule,
                MatNativeDateModule],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                {
                    provide: MAT_DIALOG_DATA, useValue: {
                        data: {
                            data: dataForDialog
                        }
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogMoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dialogCloseBtnEl = fixture.debugElement.query(By.css('.dialog__close-btn'));          // Find close button element
        dialogConfirmDeleteBtnEl = fixture.debugElement.query(By.css('.dialog__confirm-delete-btn')); // Find confirm delete button element
        dialogConfirmSaveBtnEl = fixture.debugElement.query(By.css('.dialog__confirm-save-btn')); // Find confirm save button element

        fixture.detectChanges();
    });

    it(`should create an instance of 'DialogMoreComponent' (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    describe(`#view tests`, () => {
        // TODO: Improve this test for closing dialog, and test the same in DialogDeleteComponent
        // look here https://github.com/angular/material2/blob/master/src/lib/dialog/dialog.spec.ts#L178
        // here https://github.com/angular/material2/blob/d1128febe6d23f1a1f20446692bc2a8358e8b8cf/src/lib/dialog/dialog.spec.ts#L116-L116
        // and here https://medium.com/@aleixsuau/testing-angular-components-with-material-dialog-mddialog-1ae658b4e4b3
        // it(`clicking on button.dialog__close-btn should call method 'dialogRef.close()' (async)`, async () => {
        //     // Arrange

        //     // Act
        //     spyOn(component.dialogRef, 'close');
        //     if (dialogCloseBtnEl instanceof HTMLElement) {
        //         dialogCloseBtnEl.click();
        //     } else {
        //         dialogCloseBtnEl.triggerEventHandler('click', { button: 0 });
        //     }

        //     // Assert
        //     fixture.whenStable().then(() => {
        //         expect(component.dialogRef.close).toHaveBeenCalled();
        //     });
        // });

        it(`clicking on button.dialog__confirm-delete-btn should call method 'onConfirmDelete()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'onConfirmDelete');
            if (dialogConfirmDeleteBtnEl instanceof HTMLElement) {
                dialogConfirmDeleteBtnEl.click();
            } else {
                dialogConfirmDeleteBtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.onConfirmDelete).toHaveBeenCalled();
            });
        });

        it(`clicking on button.dialog__confirm-save-btn should call method 'onConfirmSave()' (async)`, async () => {
            // Arrange

            // Act
            spyOn(component, 'onConfirmSave');
            if (dialogConfirmSaveBtnEl instanceof HTMLElement) {
                dialogConfirmSaveBtnEl.click();
            } else {
                dialogConfirmSaveBtnEl.triggerEventHandler('click', { button: 0 });
            }

            // Assert
            fixture.whenStable().then(() => {
                expect(component.onConfirmSave).toHaveBeenCalled();
            });
        });
    });
});
