import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-delete',
    templateUrl: './dialog-delete.component.html',
    styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit() {
    }

    onConfirm() {
        this.dialogRef.close('Confirm');
    }

}
