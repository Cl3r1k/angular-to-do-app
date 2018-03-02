import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRefMock, MatDialogDataMock } from '@app/_testing/mat-dialog-mock';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogComponent],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useClass: MatDialogDataMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

