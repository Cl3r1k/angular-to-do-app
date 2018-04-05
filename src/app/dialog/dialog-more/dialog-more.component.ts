import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-more',
    templateUrl: './dialog-more.component.html',
    styleUrls: ['./dialog-more.component.scss']
})
export class DialogMoreComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogMoreComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

    ngOnInit() {
    }

    onConfirmSave() {
        this.dialogRef.close('ConfirmSave');
    }

    onConfirmDelete() {
        this.dialogRef.close('ConfirmDelete');
    }

}
