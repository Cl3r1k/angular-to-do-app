import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogMoreComponent } from './dialog-more.component';

// tslint:disable-next-line:max-line-length
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatCheckboxModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatDialogRefMock } from '@app/_testing/mat-dialog-mock';

describe('DialogMoreComponent', () => {
    let component: DialogMoreComponent;
    let fixture: ComponentFixture<DialogMoreComponent>;
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

        dialogConfirmBtnEl = fixture.debugElement.query(By.css('.dialog__confirm-btn'));       // Find close button element

        fixture.detectChanges();
    });

    it(`should create an instance of 'DialogMoreComponent' (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));
});
